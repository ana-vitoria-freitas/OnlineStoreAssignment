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
      entry: './homePage/home.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './homePage/style-bundle-home.js',
      },
      module: {
        rules: [{
          test: /home.scss$/,
          use: getStyleUse('./homePage/bundle-home.css')
        }]
      },
    },  
    {
      entry: './loginPage/login.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './loginPage/style-bundle-login.js',
      },
      module: {
        rules: [{
          test: /login.scss$/,
          use: getStyleUse('./loginPage/bundle-login.css')
        }]
      },
    },
    {
      entry: './registerPage/register.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './registerPage/style-bundle-register.js',
      },
      module: {
        rules: [{
          test: /register.scss$/,
          use: getStyleUse('./registerPage/bundle-register.css')
        }]
      },
    },
    {
      entry: './sellerAccountPage/sellerAccount.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './sellerAccountPage/style-bundle-seller-account.js',
      },
      module: {
        rules: [{
          test: /sellerAccount.scss$/,
          use: getStyleUse('./sellerAccountPage/bundle-seller-account.css')
        }]
      },
    },
    {
      entry: './clientAccountPage/clientAccount.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './clientAccountPage/style-bundle-client-account.js',
      },
      module: {
        rules: [{
          test: /clientAccount.scss$/,
          use: getStyleUse('./clientAccountPage/bundle-client-account.css')
        }]
      },
    },
    {
      entry: './checkoutPage/checkout.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './checkoutPage/style-bundle-checkout.js',
      },
      module: {
        rules: [{
          test: /checkout.scss$/,
          use: getStyleUse('./checkoutPage/bundle-checkout.css')
        }]
      },
    },
    {
      entry: './cartPage/cart.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './cartPage/style-bundle-cart.js',
      },
      module: {
        rules: [{
          test: /cart.scss$/,
          use: getStyleUse('./cartPage/bundle-cart.css')
        }]
      },
    },
    {
      entry: './userManagementPage/user.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './userManagementPage/style-bundle-user.js',
      },
      module: {
        rules: [{
          test: /user.scss$/,
          use: getStyleUse('./userManagementPage/bundle-user.css')
        }]
      },
    },
    {
      entry: './addProductPage/add-product.scss',
      output: {
        // This is necessary for webpack to compile, but we never reference this js file.
        filename: './addProductPage/style-bundle-add-product.js',
      },
      module: {
        rules: [{
          test: /add-product.scss$/,
          use: getStyleUse('./addProductPage/bundle-add-product.css')
        }]
      },
    },
  ];
  