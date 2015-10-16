describe('getSpecificity', function () {
    'use strict';

    it('should return 0 if the arguments are not valid', function () {
        expect(uniquePath.getSpecificity()).toBe(0);
        expect(uniquePath.getSpecificity({})).toBe(0);
    });

    // TODO: extract path arrays and evaluate them here
});
