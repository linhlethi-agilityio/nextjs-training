import { isEnableSubmitButton, isValidPrice } from '..';

describe('isEnableSubmitButton', () => {
  it('should return true when all required fields are dirty and there are no errors', () => {
    const requiredFields = ['username', 'email'];
    const dirtyFields = ['username', 'email'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(true);
  });

  it('should return false if not all required fields are dirty', () => {
    const requiredFields = ['username', 'email'];
    const dirtyFields = ['username'];
    const errors = {};

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(false);
  });

  it('should return false if there are errors present', () => {
    const requiredFields = ['username', 'email'];
    const dirtyFields = ['username', 'email'];
    const errors = {
      email: 'Email is required',
    };

    const result = isEnableSubmitButton(requiredFields, dirtyFields, errors);

    expect(result).toBe(false);
  });
});

describe('isValidPrice', () => {
  it('should return true for a valid price greater than 0', () => {
    const result = isValidPrice('10.5');
    expect(result).toBe(true);
  });

  it('should return false for an invalid price (not a number)', () => {
    const result = isValidPrice('abc');
    expect(result).toBe(false);
  });

  it('should return false for a price of 0', () => {
    const result = isValidPrice('0');
    expect(result).toBe(false);
  });

  it('should return false for a negative price', () => {
    const result = isValidPrice('-10');
    expect(result).toBe(false);
  });
});
