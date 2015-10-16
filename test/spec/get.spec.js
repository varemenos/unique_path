describe('get', function () {
    'use strict';

    it('should get a unique path', function () {
        var selectors = [
            '#wrapper',
            'p',
            'h1',
            'ul li',
            'ul',
            'li',
            '.img img',
            '.media--right .img',
            '.grid',
            '.row.align--center',
            '.grid .row',
            '.col-6-12.vertical-spacing.align--left',
            '.row.vertical-spacing .col-4-12.align--center .item:nth-child(1)',
            '.row.vertical-spacing .col-4-12.align--center .item',
            'hr',
            '.resize--vertical',
            '.col-6-12 .item ul li',
            '.row.vertical-spacing.last .col-6-12 .item'
        ];

        // add the line below to fix it

        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            var elCheck = document.querySelectorAll(uniquePath.get(el)).length;

            expect(elCheck).toBe(1);
        }

        expect(uniquePath.get(document.querySelectorAll('body'))).toBe('body');
        expect(uniquePath.get()).toBe(false);
        expect(uniquePath.get(document)).toBe(false);
        expect(uniquePath.get(document.querySelector('html'))).toBe('html');
    });
});
