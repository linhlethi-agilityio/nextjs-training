import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'textDark',
  },

  sizes: {
    xs: {
      fontSize: 'xs',
      lineHeight: 2,
    },
    sm: {
      fontSize: '2xl',
      lineHeight: 5,
    },
    md: {
      fontSize: 'md',
      lineHeight: 3,
    },
  },

  defaultProps: {
    size: 'xs',
  },
});
