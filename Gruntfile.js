module.exports = function (grunt) {
    'use strict';

    // time grunt tasks
    require('time-grunt')(grunt);

    // lazy-load grunt tasks
    require('jit-grunt')(grunt);

    // load grunt task configurations
    var configs = require('load-grunt-configs')(grunt, {
        config: {
            src: 'tasks/*.js'
        }
    });
    grunt.initConfig(configs);

    grunt.registerTask('default', ['karma:continuous']);
};
