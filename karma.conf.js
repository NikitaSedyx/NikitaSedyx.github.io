'use strict';

const webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
const karmaWebpack = require('karma-webpack');

module.exports = function(config) {
  config.set({
    basePath: './task7/',
    frameworks: ['jasmine'],
    files: [
        './dist/index.js',
        '../node_modules/angular-stub-changes/index.js',
        './index.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
        './dist/index.js': ['webpack', 'coverage'],
        './index.spec.js': ['babel', 'webpack']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true,
        stats: {
            chunks: false
        }
    },
    singleRun: false,
    concurrency: Infinity,
    coverageReporter: {
      type : 'html',
      dir : './coverage/'
    }
  })
}
