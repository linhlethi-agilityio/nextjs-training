import type { Metadata } from 'next';
import { Box, Flex } from '@chakra-ui/react';

// Providers
import { ChakraUIProvider } from '@/providers';

// Components
import { SideBar } from '@/components';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description:
    'Admin dashboard is a comprehensive e-commerce web application designed to facilitate online shopping.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraUIProvider>
          <Flex height="100vh">
            <SideBar />
            <Box flex={1} bgColor="backgroundDashboard">
              <Box>{children}</Box>
            </Box>
          </Flex>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
