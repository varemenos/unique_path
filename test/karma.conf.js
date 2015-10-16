module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-jasmine',
            'karma-html2js-preprocessor',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ],
        files: [
            'src/**/*.js',
            'test/dom.js',
            'test/spec/**/*.spec.js'
        ],
        preprocessors: {
            'src/**/*.js': ['coverage']
        },
        reporters: [
            'spec',
            'coverage'
        ]
    });
};
