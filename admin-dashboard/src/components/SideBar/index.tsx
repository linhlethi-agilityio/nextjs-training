'use client';

import { memo } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

// Constants
import { MENU } from '@/constants';

// Components
import { SideBarItem } from '@/components';

const SideBar = () => {
  const pathname = usePathname();

  return (
    <Box w={144} px={4}>
      <VStack mt={172}>
        {MENU.map(({ label, icon, path }) => (
          <SideBarItem
            isFocused={path === pathname}
            label={label}
            icon={icon}
            path={path}
            key={`side-${label}`}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default memo(SideBar);
