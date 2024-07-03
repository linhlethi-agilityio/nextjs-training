import { formatDateString } from '..';

describe('formatDateString', () => {
  it('should format the date correctly without time or deadline', () => {
    const result = formatDateString('2023-07-04T12:34:56Z');
    expect(result).toBe('July 4, 2023');
  });

  it('should format the date correctly with time included', () => {
    const result = formatDateString('2023-07-04T12:34:56Z', true);
    expect(result).toBe('July 4, 2023 12.34');
  });

  it('should format the date correctly as a deadline', () => {
    const result = formatDateString('2023-07-04T12:34:56Z', false, true);
    expect(result).toBe('2023-07-04');
  });

  it('should format the date correctly with time included and as a deadline', () => {
    const result = formatDateString('2023-07-04T12:34:56Z', true, true);
    expect(result).toBe('July 4, 2023 12.34');
  });

  it('should handle invalid dates gracefully', () => {
    const result = formatDateString('invalid-date');
    expect(result).toBe('undefined NaN, NaN');
  });
});
