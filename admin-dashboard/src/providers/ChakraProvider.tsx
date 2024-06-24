'use client';

// Libs
import { ChakraProvider } from '@chakra-ui/react';

// Themes
import { theme } from '@/themes';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props): JSX.Element => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export const ChakraUIProvider = Providers;
