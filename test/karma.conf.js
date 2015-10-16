module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-html2js-preprocessor',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ],
        files: [
            'src/**/*.js',
            'test/dom.js',
            'test/spec/**/*.spec.js'
        ],
        reporters: [
            'spec'
        ]
    });
};
