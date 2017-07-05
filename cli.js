#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
//const mkdirp = require('mkdirp')
const isBlank = require('is-blank')
//const isPresnet = require('is-present')
const fileExists = require('file-exists')

const cli = meow(`
  Usage
    $ abrusco <input.css>
  Example
    $ abrusco src/master.css > dist/bundle.css
`, {
  alias: {
    h: 'help',
  }
})

const inputFile = cli.input[0]//path.join(process.cwd(), )

if (isBlank(inputFile)) {
  console.error(chalk.red('Please provide an input stylesheet'))
  console.log(cli.help)
  process.exit(1)
} else if (!fileExists.sync(inputFile)) {
  console.error(chalk.red('File does not exist ' + inputFile))
  console.log(cli.help)
  process.exit(1)
}

const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')

fs.readFile(inputFile, 'utf8', (err, css) => {
  postcss([
    postcssImport,
    postcssCssnext,
  ]).process(css, {
    from: inputFile,
  }).then(res => {
    console.log(res.css)
  })
})
