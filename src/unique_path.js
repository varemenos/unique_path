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
    'use strict';

    var uniquePath = {};

    uniquePath.selectorFromPath = function (givenPath) {
        var selector = givenPath
            .map(function (chunk) {
                return chunk.selector.value + chunk.separator;
            })
            .join(' ');

        return selector.trim();
    };

    uniquePath.getSpecificity = function (path) {
        var selector;

        if (typeof path === 'object' && path.length) {
            selector = uniquePath.selectorFromPath(path);
        } else if (path && path.length) {
            selector = path;
        }

        if (selector) {
            try {
                return document.querySelectorAll(selector).length;
            } catch (err) {} // eslint-disable-line no-empty
        } else {
            return 0;
        }
    };

    uniquePath.isUnique = function (givenSpecificity) {
        return givenSpecificity === 1;
    };

    uniquePath.getSelector = function (node) {
        var result;

        var selectorFromID = function () {
            return {
                type: 'id',
                value: '#' + node.id
            };
        };

        var selectorFromClass = function () {
            var value = '.' + node.className
                .split('\n').filter(Boolean) // get rid of \n
                .join(' ').split(' ').filter(Boolean) // get rid of spaces
                .join('.');

            return {
                type: 'class',
                value: value
            };
        };

        var selectorFromName = function () {
            return {
                type: 'name',
                value: node.localName
            };
        };

        if (node) {
            if (node.id !== '') {
                result = selectorFromID(node);
            } else if (node.className !== '' && typeof node.className !== 'object') {
                result = selectorFromClass(node);
            } else {
                result = selectorFromName(node);
            }
        }

        return result;
    };

    uniquePath.applyNth = function (givenPath) {
        var newSpecificity;

        for (var i = 0; i < givenPath.length; i++) {
            var parent = givenPath[i].node.parentNode;
            var item = givenPath[i];

            if (parent && parent.children.length > 1) {
                var index = Array.prototype.indexOf.call(parent.children, item.node) + 1;
                item.selector.value += ':nth-child(' + index + ')';
            }

            newSpecificity = uniquePath.getSpecificity(givenPath);
        }

        for (var i = 0; i < givenPath.length; i++) {
            var item = givenPath[i];
            var currentSelector = item.selector.value;
            var index = item.selector.value.indexOf(':nth');

            if (index > -1) {
                item.selector.value = item.selector.value.slice(0, index);
            }

            newSpecificity = uniquePath.getSpecificity(givenPath);
            if (!uniquePath.isUnique(newSpecificity)) {
                item.selector.value = currentSelector;
            }
        }
    };

    uniquePath.applyMixed = function (givenPath) {
        for (var i = 0; i < givenPath.length; i++) {
            var item = givenPath[i];

            if (item.selector.type !== 'name') {
                if (item.selector.type === 'class') {
                    item.selector.value = item.node.localName + item.selector.value;
                    item.selector.type = 'mixed';
                } else if (item.selector.type === 'id') {
                    item.selector.value = item.node.localName + item.selector.value;
                    item.selector.type = 'mixed';
                }
            }

            var newSpecificity = uniquePath.getSpecificity(givenPath);
            if (uniquePath.isUnique(newSpecificity)) {
                break;
            }
        }
    };

    uniquePath.applyDirectChildSeparator = function (givenPath) {
        for (var i = 0; i < givenPath.length - 1; i++) {
            var item = givenPath[i];
            var currentSeparator = item.separator;
            item.separator = ' > ';

            var newSpecificity = uniquePath.getSpecificity(givenPath);
            if (uniquePath.isUnique(newSpecificity)) {
                break;
            }
        }
    };

    uniquePath.get = function (el) {
        if (!el) {
            return false;
        }

        if (el.length) {
            el = el[0];
        }

        if (el.nodeType === 9) {
            return false;
        }

        if (el.localName === 'html') {
            return 'html';
        }

        var path = [];
        var specificity;

        while (el.localName !== 'html' && !uniquePath.isUnique(specificity)) {
            var selector = uniquePath.getSelector(el);

            path.unshift({
                node: el,
                separator: ' ',
                selector: selector
            });

            specificity = uniquePath.getSpecificity(path);

            el = el && el.parentNode;
        }

        if (!uniquePath.isUnique(specificity)) {
            uniquePath.applyDirectChildSeparator(path);
        }

        if (!uniquePath.isUnique(specificity)) {
            uniquePath.applyMixed(path);
        }

        if (!uniquePath.isUnique(specificity)) {
            uniquePath.applyNth(path);
        }

        return uniquePath.selectorFromPath(path);
    };

    return uniquePath;
});
