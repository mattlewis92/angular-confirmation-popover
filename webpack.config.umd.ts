const webpackAngularExternals = require('webpack-angular-externals');

export default {
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'angular-confirmation-popover.js',
    libraryTarget: 'umd',
    library: 'angularConfirmationPopover'
  },
  externals: [
    webpackAngularExternals()
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=true&failOnHint=true',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
