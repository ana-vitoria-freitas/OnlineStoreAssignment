function getStyleUse(bundleFilename) {
  return [
    {
      loader: 'file-loader',
      options: {
        name: bundleFilename,
      },
    },
    { loader: 'extract-loader' },
    { loader: 'css-loader' },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
        implementation: require('dart-sass'),
        fiber: require('fibers'),
      }
    },
  ];
}

module.exports = [
  {
    entry: './product.scss',
    output: {
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-product.js',
    },
    module: {
      rules: [{
        test: /product.scss$/,
        use: getStyleUse('bundle-product.css')
      }]
    },
  },


];
