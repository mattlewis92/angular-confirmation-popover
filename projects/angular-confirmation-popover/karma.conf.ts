// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config: any) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reporters: [
        { type: 'text-summary' },
        { type: 'html' },
        { type: 'lcovonly' },
      ],
      check: {
        emitWarning: false,
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
        },
      },
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    mime: {
      'text/x-typescript': ['ts'],
    },
  });
};
