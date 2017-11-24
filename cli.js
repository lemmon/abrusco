#!/usr/bin/env node

const fs = require('fs')
const meow = require('meow')
const chalk = require('chalk')
//const mkdirp = require('mkdirp')
const isBlank = require('is-blank')
//const isPresnet = require('is-present')
const fileExists = require('file-exists')

const cli = meow(`
  Usage
    $ abrusco <input.css>

  Options
    -o, --output Output file
    -m, --minify Minify the output stylesheet

  Example
    $ abrusco src/master.css -o dist/bundle.css
    $ abrusco src/master.css -o dist/bundle.css --minify
`, {
  alias: {
    h: 'help',
    m: 'minify',
    o: 'output',
  }
})

const inputFile = cli.input[0]
const outputFile = cli.flags.output

if (isBlank(inputFile)) {
  console.error(chalk.red('Please provide an input stylesheet'))
  console.log(cli.help)
  process.exit(1)
} else if (!fileExists.sync(inputFile)) {
  console.error(chalk.red('File does not exist ' + inputFile))
  console.log(cli.help)
  process.exit(1)
}

if (outputFile) {
  if (typeof outputFile !== 'string') {
    console.error(chalk.red('Invalid output file provided'))
    console.log(cli.help)
    process.exit(1)
  }
}

const options = {
  from: inputFile,
  plugins: [
    require('postcss-reporter'),
  ],
}

if (outputFile) {
  options.to = outputFile
}

if (cli.flags.minify) {
  options.minify = true
}

fs.readFile(inputFile, 'utf8', (err, css) => {
  abrusco(css, options).then(res => {
    if (outputFile) {
      fs.writeFile(outputFile, res.css, (err) => {
        if (err) throw err
        console.log('Okay')
      })
    } else {
      process.stdout.write(res.css)
    }
  })
})
