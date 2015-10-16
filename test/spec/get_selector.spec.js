describe('getSelector', function () {
    'use strict';

    it('should get selectors from elements', function () {
        var selectors = [{
            value: '#wrapper',
            type: 'id'
        }, {
            value: '.truncate',
            type: 'class'
        }, {
            value: 'h1',
            type: 'name'
        }, {
            value: '.img',
            type: 'class'
        }];

        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i].value);

            expect(uniquePath.getSelector(el)).toEqual(selectors[i]);
        }
    });
});
