var fs = require('fs');
var path = require('path');

var modularize = {
    open: fs.readFileSync(path.join(process.cwd() + '/_modularize/open.js')),
    close: fs.readFileSync(path.join(process.cwd() + '/_modularize/close.js'))
};

var indent = function (src) {
    'use strict';

    var fourSpaces = '    ';

    return src.split('\n').map(function (line) {
        if (line.length > 0) {
            return fourSpaces + line;
        } else {
            return line;
        }
    }).join('\n');
};

module.exports = {
    options: {
        separator: '',
        process: function (src, filepath) {
            'use strict';

            return modularize.open + indent(src) + modularize.close;
        }
    },
    dev: {
        src: [
            'src/unique_path.js'
        ],
        dest: 'dist/unique_path.js'
    }
};
