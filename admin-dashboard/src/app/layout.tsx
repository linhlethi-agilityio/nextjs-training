import type { Metadata } from 'next';
import { Button } from '@chakra-ui/react';

// Providers
import { ChakraUIProvider } from '@/providers';

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
          <Button>abc</Button>
          {children}
        </ChakraUIProvider>
      </body>
    </html>
  );
}
