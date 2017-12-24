import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const IS_PROD = process.argv.indexOf('-p') > -1;

export default {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: __dirname + '/demo/entry.ts',
  output: {
    filename: 'demo.js',
    path: IS_PROD ? __dirname + '/demo' : __dirname
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
      enforce: 'pre',
      options: {
        emitErrors: IS_PROD,
        failOnHint: IS_PROD
      }
    }, {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        transpileOnly: true
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo'
  },
  plugins: [
    ...(IS_PROD ? [] : [new webpack.HotModuleReplacementPlugin()]),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)esm5/,
      __dirname + '/src'
    ),
    new ForkTsCheckerWebpackPlugin({
      watch: ['./src', './demo'],
      formatter: 'codeframe',
      async: !IS_PROD
    })
  ]
};
