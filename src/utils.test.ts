import { isArrayOrObject, isBoolean, isNumber } from './utils';

describe('isArrayOrObject', () => {
  it('returns false for non array/objects', () => {
    expect(isArrayOrObject('1')).toBe(false);
    expect(isArrayOrObject('test')).toBe(false);
  });

  it('returns true for array/objects', () => {
    expect(isArrayOrObject('[1]')).toBe(true);
    expect(isArrayOrObject('{"name": "Jhon Doe"}')).toBe(true);
  });
});

describe('isBoolean', () => {
  it('returns false for non booleans', () => {
    expect(isBoolean('1')).toBe(false);
    expect(isBoolean('test')).toBe(false);
    expect(isBoolean('{"name": "test"}')).toBe(false);
    expect(isBoolean('[1]')).toBe(false);
  });

  it('returns true for booleans', () => {
    expect(isBoolean('true')).toBe(true);
    expect(isBoolean('false')).toBe(true);
  });
});

describe('isNumber', () => {
  it('returns false for non numbers', () => {
    expect(isNumber('test')).toBe(false);
    expect(isNumber('1.')).toBe(false);
    expect(isNumber('{"name": "test"}')).toBe(false);
    expect(isNumber('[1]')).toBe(false);
  });

  it('returns true for numbers', () => {
    expect(isNumber('1')).toBe(true);
    expect(isNumber('2.5')).toBe(true);
    expect(isNumber('123.456')).toBe(true);
  });
});
