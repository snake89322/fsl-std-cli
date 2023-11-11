module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        // https://github.com/postcss/autoprefixer#disabling
        flexbox: 'no-2009',
      },
      // https://github.com/csstools/postcss-preset-env
      stage: 3,
    }),
  ],
}
