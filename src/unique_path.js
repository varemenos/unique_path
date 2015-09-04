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

    uniquePath.separator = ' ';

    uniquePath.selectorFromPath = function (givenPath) {
        var selector = givenPath.map(function (chunk) {
            return chunk.selector.value;
        }).join(uniquePath.separator);

        return selector;
    };

    uniquePath.getSpecificity = function (path) {
        var selector;

        if (typeof path === 'object') {
            selector = uniquePath.selectorFromPath(path);
        } else {
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

    uniquePath.checkSpecificity = function (givenSpecificity) {
        return givenSpecificity === 1;
    };

    uniquePath.getSelector = function (node) {
        var value;
        var type;

        if (node) {
            if (node.id !== '') {
                type = 'id';
                value = '#' + node.id;
            } else if (node.className !== '' && typeof node.className !== 'object') {
                type = 'class';

                value = '.' + node.className.split('\n').filter(Boolean).join(uniquePath.separator).split(uniquePath.separator).filter(Boolean).join('.');
            } else {
                type = 'name';
                value = node.localName;
            }
        }

        return {
            value: value,
            type: type
        };
    };

    uniquePath.strengthenSpecificity = function (givenPath) {
        var newSpecificity;

        for (var i = 0; i < givenPath.length; i++) {
            if (givenPath[i].node.parentNode && givenPath[i].node.parentNode.children.length > 1) {
                var index = Array.prototype.indexOf.call(givenPath[i].node.parentNode.children, givenPath[i].node) + 1;
                givenPath[i].selector.value = givenPath[i].selector.value + ':nth-child(' + index + ')';
            }
            newSpecificity = uniquePath.getSpecificity(givenPath);
        }

        for (var i = 0; i < givenPath.length; i++) {
            var currentSelector = givenPath[i].selector.value;
            var index = givenPath[i].selector.value.indexOf(':nth');

            if (index > -1) {
                givenPath[i].selector.value = givenPath[i].selector.value.slice(0, index);
            }

            newSpecificity = uniquePath.getSpecificity(givenPath);
            if (!uniquePath.checkSpecificity(newSpecificity)) {
                givenPath[i].selector.value = currentSelector;
            }
        }
    };

    uniquePath.strengthenSpecificityTwice = function (givenPath) {
        for (var i = 0; i < givenPath.length; i++) {
            if (givenPath[i].selector.type !== 'name') {
                if (givenPath[i].selector.type === 'class') {
                    givenPath[i].selector.value = givenPath[i].node.localName + givenPath[i].selector.value;
                    givenPath[i].selector.type = 'mixed';
                } else if (givenPath[i].selector.type === 'id') {
                    givenPath[i].selector.value = givenPath[i].node.localName + givenPath[i].selector.value;
                    givenPath[i].selector.type = 'mixed';
                }
            }

            var newSpecificity = uniquePath.getSpecificity(givenPath);
            if (uniquePath.checkSpecificity(newSpecificity)) {
                break;
            }
        }
    };

    uniquePath.get = function (el) {
        var path = [];
        var specificity;

        if (el.length) {
            el = el[0];
        }

        if (el.nodeType === 9) {
            return false;
        }

        if (el.localName === 'html') {
            return 'html';
        }

        while (el.localName !== 'html' && !uniquePath.checkSpecificity(specificity)) {
            var selector = uniquePath.getSelector(el);

            path.unshift({
                node: el,
                selector: selector
            });

            specificity = uniquePath.getSpecificity(path);

            el = el && el.parentNode;
        }

        if (!uniquePath.checkSpecificity(specificity)) {
            uniquePath.strengthenSpecificity(path);
        }

        if (!uniquePath.checkSpecificity(specificity)) {
            uniquePath.strengthenSpecificityTwice(path);
        }

        return uniquePath.selectorFromPath(path);
    };

    return uniquePath;
});
