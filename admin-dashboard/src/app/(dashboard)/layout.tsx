import type { Metadata } from 'next';
import { Box, Flex } from '@chakra-ui/react';

// Components
import { SideBar } from '@/components';
import { logout } from '@/actions/auth';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex h="full">
      <SideBar onLogout={logout} />
      <Box flex={1} bgColor="backgroundDashboard">
        <Box>{children}</Box>
      </Box>
    </Flex>
  );
}
