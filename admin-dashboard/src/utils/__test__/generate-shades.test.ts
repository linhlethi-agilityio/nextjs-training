import { generateShades } from '..';

describe('generateShades', () => {
  it('should generate correct shades for a given hex color', () => {
    const shades = generateShades('#ff5733');
    expect(shades).toEqual({
      '50': '#ffeeeb',
      '100': '#ffcdc2',
      '200': '#ffbcad',
      '300': '#ff9a85',
      '400': '#ff795c',
      '500': '#ff5733',
      '600': '#e64e2e',
      '700': '#cc4629',
      '800': '#b33d24',
      '900': '#99341f',
    });
  });
});
