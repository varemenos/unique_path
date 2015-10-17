module.exports = function (config) {
    'use strict';
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox'
        },
        sl_ios_safari: {
            base: 'SauceLabs',
            browserName: 'iphone',
            version: '7.1'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '11'
        }
    };

    config.set({
        basePath: '../',
        colors: true,
        frameworks: ['jasmine'],
        customLaunchers: customLaunchers,
        browsers: [
            'PhantomJS',
            'Chrome',
            'Firefox'
        ].concat(Object.keys(customLaunchers)),
        sauceLabs: {
            testName: 'unique_path tests',
            username: 'adonisk',
            accessKey: '2ca162d2-7b49-440e-ade0-e14b9dbf5ca4'
        },
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-sauce-launcher'
        ],
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
