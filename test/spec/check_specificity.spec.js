describe('isUnique', function () {
    'use strict';

    it('should return true when specificity is 1', function () {
        expect(uniquePath.isUnique(1)).toBe(true);
    });

    it('should return false when specificity is not 1', function () {
        for (var i = 0; i < 100; i++) {
            var number = Math.floor(Math.random() * 100);

            if (number !== 1) {
                expect(uniquePath.isUnique(number)).not.toBe(true);
            }
        }
    });
});
