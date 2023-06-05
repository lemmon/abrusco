#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const fileExists = require('file-exists')
const isDirectory = require('is-directory')
const abrusco = require('./index')

const cli = meow(
  `
    Usage
      $ abrusco <input.css>

    Options
      -o, --output Output file
      -m, --minify Minify the output stylesheet
      -w, --watch  Watch CSS source directory for changes
      --novars     Do not preserve Custom Properties
      --purge      Purge CSS

    Example
      $ abrusco src/master.css -o dist/bundle.css
      $ abrusco src/master.css -o dist/bundle.css --minify
      $ abrusco src/master.css -o dist/bundle.css --watch
  `,
  {
    flags: {
      help: {
        type: 'boolean',
        alias: 'h',
      },
      minify: {
        type: 'boolean',
        alias: 'm',
      },
      output: {
        type: 'string',
        alias: 'o',
      },
      watch: {
        type: 'boolean',
        alias: 'w',
      },
      novars: {
        type: 'boolean',
      },
      purge: {
        type: 'boolean',
      },
    },
  }
)

function findFile(input, cb) {
  if (isDirectory.sync(input)) {
    return findFile(path.join(input, 'index.css'), cb)
  } else if (fileExists.sync(input)) {
    return fileReadable(input)
  } else if (fileExists.sync(input + '.css')) {
    return fileReadable(input + '.css')
  } else {
    console.error(chalk.red(`file not found: ${cli.input[0]}`))
    process.exit(1)
  }
}

function fileReadable(file) {
  try {
    fs.accessSync(file, fs.constants.R_OK)
    return file
  } catch (err) {
    console.error(chalk.red(`input file not readable: ${file}`))
    process.exit(1)
  }
}

function validateOutput(output) {
  if (!output) {
    return null
  }
  // output is a directory
  if (isDirectory.sync(output)) {
    return validateOutput(path.join(output, 'bundle.css'))
  }
  // output file writable
  if (fileExists.sync(output)) {
    try {
      fs.accessSync(output, fs.constants.W_OK)
      return output
    } catch (err) {
      console.error(chalk.red(`output file not writable: ${output}`))
      process.exit(1)
    }
  }
  // check output directory
  const outputDir = path.dirname(output)
  // output directory exists
  if (!isDirectory.sync(outputDir)) {
    console.error(chalk.red(`output directory does not exist: ${outputDir}`))
    process.exit(1)
  }
  // output directory writable
  try {
    fs.accessSync(outputDir, fs.constants.W_OK)
  } catch (err) {
    console.error(chalk.red(`output directory not writable: ${outputDir}`))
    process.exit(1)
  }
  //
  return output
}

async function readStdin() {
  let code = ''
  const stdin = process.stdin
  return new Promise((resolve) => {
    stdin.setEncoding('utf8')
    stdin.on('readable', () => {
      const chunk = process.stdin.read()
      if (chunk !== null) code += chunk
    })
    stdin.on('end', () => {
      resolve(code)
    })
  })
}

async function handleStdin() {
  handleBuild({
    from: undefined,
    css: await readStdin(),
  })
}

async function handleFile() {
  handleBuild({
    from: findFile(cli.input[0]),
  })
}

function handleBuild(props) {
  const outputFile = validateOutput(cli.flags.output)
  // options
  const options = {
    ...props,
    to: outputFile,
    plugins: [require('postcss-reporter')],
    cssvars: !cli.flags.novars,
    purge: cli.flags.purge,
    minify: cli.flags.minify,
  }
  // check files
  if (options.from && options.to && options.from === options.to) {
    console.error(chalk.red(`output cannot be same as input: ${options.to}`))
    process.exit(1)
  }
  // build
  buildCSS(options)
  // watch
  if (cli.flags.watch) {
    // cannot watch stdin
    if (!options.from) {
      console.error(chalk.red(`cannot watch stdin`))
      process.exit(1)
    }
    // do watch
    const chokidar = require('chokidar')
    chokidar
      .watch(path.dirname(options.from), {
        ignored: options.to || null,
      })
      .on('change', () => {
        buildCSS(options)
      })
  }
}

function buildCSS(props) {
  const t0 = Date.now()
  const css = props.from ? fs.readFileSync(props.from, 'utf8') : props.css
  abrusco(css, props)
    .then((res) => {
      if (props.to) {
        fs.writeFile(props.to, res.css, (err) => {
          if (err) throw err
          const t1 = new Date()
          const ts = (t1.valueOf() - t0) / 1000
          console.log(
            `${res.css.length} bytes written to ${props.to} (${ts.toFixed(
              2
            )} seconds) at ${t1.toLocaleTimeString()}`
          )
        })
      } else {
        process.stdout.write(res.css)
      }
    })
    .catch((err) => {
      let output = '\n'
      if (err.file) {
        output += `${chalk.bold.underline(logFrom(err.file))}\n`
      }
      if (err.reason) {
        output += `${chalk.red(`[${err.name}]`)} ${chalk.bold(
          `${err.line}:${err.column}`
        )}\t${err.reason}`
      } else {
        output += `${chalk.red(`[${err.name}]`)} ${err.message}`
      }
      console.error(output)
    })
}

function logFrom(fromValue) {
  if (fromValue.charAt(0) === '<') return fromValue
  return path.relative(process.cwd(), fromValue).split(path.sep).join('/')
}

if (cli.input.length === 0) {
  if (!process.stdin.isTTY) {
    handleStdin()
  } else {
    cli.showHelp()
  }
} else if (cli.input.length === 1) {
  handleFile()
} else {
  console.error(chalk.red(`invalid input`))
  process.exit(1)
}
