'use client';

import dynamic from 'next/dynamic';
import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

// Constants
import { MENU, ROUTES } from '@/constants';

// Components
import { SideBarItem } from '@/components';
import { useCallback, useTransition } from 'react';

const DynamicConfirmModal = dynamic(() => import('../Modal/ConfirmModal'));

interface SideBarProps {
  onLogout: () => Promise<void>;
}

const SideBar = ({ onLogout }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      await onLogout();
      router.push(ROUTES.LOGIN);
    });
  }, [onLogout, router]);

  return (
    <>
      <Flex
        flexDirection="column"
        w={144}
        px={4}
        h="100vh"
        pt={172}
        pb={23}
        justifyContent="space-between"
      >
        <VStack>
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
        <Button position="fixed" bottom={5} w={100} onClick={onOpenConfirm}>
          Logout
        </Button>
      </Flex>
      {isOpenConfirm && (
        <DynamicConfirmModal
          isLoading={isPending}
          isOpen={isOpenConfirm}
          onCancel={onCloseConfirm}
          title="Logout"
          description="Are you sure you would like to logout order"
          buttonLabel="Submit"
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default SideBar;
