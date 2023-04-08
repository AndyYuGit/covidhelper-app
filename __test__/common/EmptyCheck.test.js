import { emptyCheck } from "../../src/common/EmptyCheck";


it('empty string is empty', () => {
    expect(emptyCheck('')).toBe(true);
});

it('null is empty', () => {
    expect(emptyCheck(null)).toBe(true);
});

it('empty array is empty', () => {
    expect(emptyCheck([])).toBe(true);
});

it('is not empty', () => {
    expect(emptyCheck('a')).toBe(false);
});