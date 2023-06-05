const postcss = require('postcss')

const getPlugins = (options) => {
  // plugins
  const plugins = [
    require('postcss-import'),
    require('postcss-assets'),
    require('postcss-preset-env')({
      stage: 0,
      features: {
        ...(options.cssvars === false && {
          'custom-properties': {
            preserve: false,
          },
        }),
      },
    }),
  ]
  // plugins
  if (Array.isArray(options.plugins)) {
    plugins.push(...options.plugins)
  }
  // purge css
  if (options.purge) {
    const purgecss = require('@fullhuman/postcss-purgecss')
    plugins.push(
      purgecss({
        defaultExtractor: (x) => x.match(/[\w-/:]+(?<!:)/g) || [],
      })
    )
  }
  // format output
  plugins.push(
    require('postcss-discard-comments'),
    require('postcss-discard-duplicates')
  )
  // minify
  if (options.minify) {
    plugins.push(
      require('cssnano')({
        autoprefixer: false,
      })
    )
  }
  //
  return plugins
}

module.exports = (css, options) =>
  postcss(getPlugins(options)).process(css, options)
