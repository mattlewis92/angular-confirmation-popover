module.exports = {
  entry: './src/confirm.ts',
  output: {
    path: './dist',
    filename: 'angular2-bootstrap-confirm.js',
    libraryTarget: 'umd',
    library: 'ng2BootstrapConfirm'
  },
  externals: {
    'angular2/core': {
      root: ['ng', 'core'],
      commonjs: 'angular2/core',
      commonjs2: 'angular2/core',
      amd: 'angular2/core'
    },
    'ng2-bootstrap/components/position': 'ng2-bootstrap/components/position'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/,
      /*query: {
        compilerOptions: {
          declaration: true
        }
      }*/
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};