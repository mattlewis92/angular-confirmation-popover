module.exports = {
  entry: './angular2-bootstrap-confirm.ts',
  output: {
    filename: './angular2-bootstrap-confirm.js',
    libraryTarget: 'umd',
    library: 'ng2BootstrapConfirm'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    }
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/,
      query: {
        compilerOptions: {
          declaration: true
        }
      }
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};