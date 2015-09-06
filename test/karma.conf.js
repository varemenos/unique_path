module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
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
