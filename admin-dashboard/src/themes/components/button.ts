import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontSize: 'lg',
    lineHeight: 3,
    borderRadius: 'xl',
    py: 2.5,
    px: 25,
  },

  variants: {
    outline: {
      borderColor: 'borderDefault',
      color: 'info.500',
    },

    sideBar: {
      borderColor: 'borderPrimary',
      color: 'brand.500',
      border: '1px solid',
      fontSize: 10,
      lineHeight: 1,
    },
  },
});
