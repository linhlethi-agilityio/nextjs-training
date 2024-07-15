import type { Metadata } from 'next';

import './globals.css';

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
          <main>{children}</main>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
