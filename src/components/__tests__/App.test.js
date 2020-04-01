const sum = (a, b) => a + b;

describe('Testing the setup', () => {
    it('1 + 1 = 2', () => {
        expect(sum(1, 1)).toBe(2);
    });
});
