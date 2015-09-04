module.exports = {
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
