xdescribe('selectorFromPath', function () {
    'use strict';

    var path;

    beforeEach(function () {
        path = [];
    });

    it('should', function () {
        path.push({
            separator: ' > ',
            selector: {
                type: 'name',
                value: 'body'
            }
        });

        path.push({
            separator: ' > ',
            selector: {
                type: 'mixed',
                value: 'div#wrapper'
            }
        });

        path.push({
            separator: ' ',
            selector: {
                type: 'mixed',
                value: 'div.row.vertical-spacing:nth-child(4)'
            }
        });

        expect(true).toBe(true);
    });
});
