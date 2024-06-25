import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      borderRadius: '2xl',
      color: 'textDark',
      fontSize: 'lg',
      lineHeight: 2,

      _placeholder: {
        color: 'textDark',
      },
    },
  },
});
