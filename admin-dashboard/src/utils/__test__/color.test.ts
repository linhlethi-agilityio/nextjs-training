import { getColorByValue } from '../color';

describe('getColorByValue', () => {
  it('should return undefined for color and bgColor for an invalid value', () => {
    expect(getColorByValue('invalid')).toEqual({
      color: undefined,
      bgColor: undefined,
    });
  });

  it('should return undefined for color and bgColor if value is an empty string', () => {
    expect(getColorByValue('')).toEqual({
      color: undefined,
      bgColor: undefined,
    });
  });
});
