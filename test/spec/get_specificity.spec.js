describe('getSpecificity', function () {
    'use strict';

    it('should return 0 if the arguments contain no valid data', function () {
        expect(uniquePath.getSpecificity()).toBe(0);
        expect(uniquePath.getSpecificity({})).toBe(0);
        expect(uniquePath.getSpecificity([])).toBe(0);
    });

    it('should return 1 if the given path is targetting body', function () {
        var path = [
            {
                node: {},
                separator: ' ',
                selector: {
                    type: 'name',
                    value: 'body'
                }
            }
        ];

        expect(uniquePath.getSpecificity(path)).toBe(1);
    });

    // TODO: extract path arrays and evaluate them here
});
