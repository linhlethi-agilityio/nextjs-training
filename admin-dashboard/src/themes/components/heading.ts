import { defineStyleConfig } from '@chakra-ui/react';

export const Heading = defineStyleConfig({
  baseStyle: {
    color: 'textDark',
  },

  sizes: {
    xxs: {
      fontsize: 'xxs',
      lineHeight: 1,
    },
    xs: {
      fontSize: 'xs',
      lineHeight: 2,
    },
    xl: {
      fontSize: 'xl',
      lineHeight: 'base',
    },
    '2xl': {
      fontSize: '2xl',
      lineHeight: 5,
    },
    '3xl': {
      fontSize: '3xl',
      lineHeight: 7,
    },
  },

  defaultProps: {
    size: '2xl',
  },
});
