module.exports = {
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'angular-confirmation-popover.js',
    libraryTarget: 'umd',
    library: 'angularConfirmationPopover'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    '@angular/platform-browser': {
      root: ['ng', 'platformBrowser'],
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser'
    }
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=true&failOnHint=true',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  performance: {
    hints: false
  }
};
