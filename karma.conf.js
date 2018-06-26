module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js')({env: 'test'});
  var browsers = [];

  if (process.env.TRAVIS) {
    browsers.push('Chrome_Travis');
  } else {
    browsers.push('Chrome');
  }

  var configuration = {

    frameworks: ['jasmine'],
    files: [ './spec-bundle.js' ],
    preprocessors: { './spec-bundle.js': ['webpack'] },
    webpack: testWebpackConfig,
    webpackMiddleware: { stats: 'errors-only'},
    reporters: [ 'mocha' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: browsers,
    customLaunchers: {
      Chrome_Travis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  };

  config.set(configuration);
};