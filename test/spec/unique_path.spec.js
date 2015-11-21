describe('unique_path', function () {
    'use strict';

    it('should work for all elements in the DOM', function () {
        var all = document.querySelectorAll('*');

        var getPath = function (target) {
            var selector = uniquePath.get(target);

            if (selector) {
                try {
                    var els = document.querySelectorAll(selector);
                    var specificity = els.length;
                } catch (err) {} // eslint-disable-line no-empty

                if (specificity !== 1) {
                    console.log(specificity, selector);
                }

                expect(specificity).toBe(1);
            }
        };

        for (var i = 0, max = all.length; i < max; i++) {
            getPath(all[i]);
        }
    });
});
