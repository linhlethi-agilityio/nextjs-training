// Libs
import { Open_Sans } from 'next/font/google';

const open_sans = Open_Sans({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
});

export const fonts = {
  heading: open_sans.style.fontFamily,
  body: open_sans.style.fontFamily,
};

export const fontSizes = {
  xs: '10px',
  md: '12px',
  lg: '14px',
};

export const lineHeights = {
  1: '14px',
  2: '16px',
  3: '19px',
};

export const radius = {
  md: '10px',
  lg: '12px',
  xl: '15px',
  '2xl': '20px',
};
