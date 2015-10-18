module.exports = function (grunt) {
    'use strict';

    var testPath = '../test/';

    var customLaunchers = require(testPath + 'custom_launchers.js');
    var plugins = require(testPath + 'plugins.js');

    return {
        options: {
            configFile: 'test/karma.conf.js',
            browsers: [
                'PhantomJS',
                'Chrome',
                'Firefox'
            ].concat(Object.keys(customLaunchers)),
            plugins: [
                'karma-phantomjs-launcher',
                'karma-chrome-launcher',
                'karma-firefox-launcher'
            ].concat(plugins)
        },
        single: {
            autoWatch: false,
            singleRun: true
        },
        continuous: {
            autoWatch: true,
            singleRun: false
        }
    };
};
