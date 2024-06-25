import React from 'react';
import type { Preview } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';

// Custom themes
import { theme } from '../src/themes';

export const parameters = {
  chakra: { theme },
};

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
