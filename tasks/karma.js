module.exports = function (grunt) {
    'use strict';

    var customLaunchers = require('../test/custom_launchers.js');
    var plugins = require('../test/plugins.js');

    return {
        options: {
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
            configFile: 'test/karma.conf.js',
            autoWatch: false,
            singleRun: true
        },
        continuous: {
            configFile: 'test/karma.conf.js',
            autoWatch: true,
            singleRun: false
        }
    };
};
