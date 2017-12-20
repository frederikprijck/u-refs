module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js')({env: 'test'});

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
    browsers: [
      'Chrome'
    ],
    singleRun: true
  };

  config.set(configuration);
};