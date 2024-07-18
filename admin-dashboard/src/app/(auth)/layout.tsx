import type { Metadata } from 'next';
import { Stack } from '@chakra-ui/react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bgColor="backgroundDashboard"
    >
      {children}
    </Stack>
  );
}
