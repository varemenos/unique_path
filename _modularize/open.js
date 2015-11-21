(function (root, name, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root[name] = factory();
    }
})(this, 'uniquePath', function () {
