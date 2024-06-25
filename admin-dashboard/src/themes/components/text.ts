import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'textDark',
  },

  sizes: {
    md: {
      fontSize: 'md',
      lineHeight: 1,
      fontWeight: 'bold',
    },
    xmd: {
      fontSize: 'md',
      lineHeight: 2,
    },
    lg: {
      fontSize: 'lg',
      lineHeight: 3,
    },
    xs: {
      fontSize: 'xs',
      lineHeight: 1,
    },
  },

  defaultProps: {
    size: 'xs',
  },
});
