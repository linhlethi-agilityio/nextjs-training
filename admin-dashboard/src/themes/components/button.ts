import { defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    fontFamily: 'PublicSans-SemiBold',
  },

  variants: {
    outline: {
      borderColor: 'textPrimary',
      color: 'textPrimary',
    },

    buttonIcon: {
      border: '1px solid',
      borderColor: 'borderMediumGray',
      color: 'textDarkBlack',
      fontSize: 'sm',
      lineHeight: 4,
    },

    icon: {
      bgColor: 'transparent',
      p: 0,
      minW: 'unset',
      color: 'textDefault',
    },
  },
});
