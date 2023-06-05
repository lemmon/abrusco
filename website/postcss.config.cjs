const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const postcssApplyClass = require('postcss-apply-class')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      stage: 0,
    }),
    postcssApplyClass(),
    !dev &&
      purgecss({
        content: ['./src/**/*.svelte', './src/**/*.html'],
        defaultExtractor: (x) => x.match(/[\w-/:]+(?<!:)/g) || [],
      }),
    !dev &&
      cssnano({
        preset: 'default',
      }),
  ],
}
