module.exports = function (config) {
    'use strict';

    var customLaunchers = require('./custom_launchers');
    var plugins = require('../test/plugins.js');

    config.set({
        basePath: '../',
        colors: true,
        frameworks: ['jasmine'],
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        sauceLabs: {
            testName: 'unique_path tests',
            username: 'adonisk',
            accessKey: '2ca162d2-7b49-440e-ade0-e14b9dbf5ca4'
        },
        plugins: plugins,
        files: [
            'src/**/*.js',
            'test/dom.js',
            'test/spec/**/*.spec.js'
        ],
        reporters: [
            'dots',
            'saucelabs'
        ],
        singleRun: true
    });
};
