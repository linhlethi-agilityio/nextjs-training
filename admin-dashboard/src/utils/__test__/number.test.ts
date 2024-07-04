import { normalizeValue } from '../number';

describe('normalizeValue', () => {
  it('should remove leading zeros from integer values', () => {
    expect(normalizeValue('000123')).toBe('123');
  });

  it('should remove leading zeros from the integer part of decimal values', () => {
    expect(normalizeValue('000123.45')).toBe('123.45');
  });

  it('should not remove leading zeros from the decimal part', () => {
    expect(normalizeValue('123.0045')).toBe('123.0045');
  });

  it('should return the same value if there are no leading zeros', () => {
    expect(normalizeValue('123')).toBe('123');
  });

  it('should handle the case where the value is "0"', () => {
    expect(normalizeValue('0')).toBe('0');
  });

  it('should handle the case where the value is "0.0"', () => {
    expect(normalizeValue('0.0')).toBe('0.0');
  });

  it('should handle the case where the value is ".123"', () => {
    expect(normalizeValue('.123')).toBe('.123');
  });

  it('should handle the case where the value is "0000.0000"', () => {
    expect(normalizeValue('0000.0000')).toBe('0.0000');
  });
});
