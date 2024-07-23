import { defineStyleConfig } from '@chakra-ui/react';

export const Input = defineStyleConfig({
  baseStyle: {
    field: {
      color: 'textDark',
      fontSize: 'lg',
      lineHeight: 2,
      border: '1px solid',

      _placeholder: {
        color: 'textDark',
      },
    },
  },

  variants: {
    default: {
      field: {
        borderRadius: '2xl',
        borderColor: 'borderDefault',
      },
    },
    primary: {
      field: {
        borderRadius: 10,
        borderColor: 'borderInput',
      },
    },
  },
  defaultProps: {
    variant: 'default',
  },
});
