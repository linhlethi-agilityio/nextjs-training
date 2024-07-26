import { getColorByValue } from '../color';

describe('getColorByValue', () => {
  it('should return correct color and background color for a given status value', () => {
    const result = getColorByValue('Rejected');
    expect(result).toEqual({
      color: 'textRejectedStatus',
      bgColor: 'backgroundRejectedStatus',
    });
  });

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
