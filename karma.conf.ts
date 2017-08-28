import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export default function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'test/angular-confirmation-popover.spec.ts'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/angular-confirmation-popover.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [{
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          enforce: 'pre',
          options: {
            emitErrors: config.singleRun,
            failOnHint: config.singleRun
          }
        }, {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            transpileOnly: !config.singleRun
          }
        }, {
          test: /src\/.+\.ts$/,
          exclude: /(test|node_modules)/,
          loader: 'istanbul-instrumenter-loader',
          enforce: 'post'
        }]
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i
        }),
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          __dirname + '/src'
        )
      ].concat(config.singleRun ? [
        new webpack.NoEmitOnErrorsPlugin()
      ] : [
        new ForkTsCheckerWebpackPlugin({
          watch: ['./src', './test'],
          formatter: 'codeframe'
        })
      ])
    },

    coverageIstanbulReporter: {
      reports: ['text-summary', 'html', 'lcovonly'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 99,
        lines: 99,
        branches: 96,
        functions: 96
      }
    },

    mime: {
      'text/x-typescript': ['ts']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage-istanbul'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless']
  });
};
