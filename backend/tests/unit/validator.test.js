const { validateEmail } = require('../../utils/validator');


describe('validateEmail', () => {
    test('accepts valid email', () => {
        expect(validateEmail('dhaval@example.com')).toBe(true);
    });
    test('rejects invalid email', () => {
        expect(validateEmail('not-an-email')).toBe(false);
    });
});