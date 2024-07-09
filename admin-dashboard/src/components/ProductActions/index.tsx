'use client';

import { memo, useCallback, useMemo, useTransition } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Icons
import { FileArrowUpIcon, PrinterIcon, CreateFolderIcon } from '@/icons';

// Models
import { Order } from '@/models';

// Components
import { SearchInput } from '@/components';

const DynamicOrderModal = dynamic(() => import('../Modal/OrderModal'));

interface ProductActionsProps {
  addOrderAction: (data: Partial<Order>) => Promise<void | string>;
}

const ProductActions = ({ addOrderAction }: ProductActionsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  const {
    isOpen: isOpenOrderModal,
    onOpen: onOpenOrderModal,
    onClose: onCloseOrderModal,
  } = useDisclosure();

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', '1');

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const searchValue = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams],
  );

  const handleAddOrder = useCallback(
    (data: Partial<Order>) => {
      startTransition(async () => {
        const response = await addOrderAction(data);

        if (typeof response !== 'string') {
          onCloseOrderModal();
        }
      });
    },
    [addOrderAction, onCloseOrderModal],
  );

  return (
    <>
      <Flex justifyContent="space-between" mt={26} ml={8}>
        <SearchInput
          placeholder="Search by ID Order"
          w={465}
          onSearch={handleSearch}
          defaultValue={searchValue}
        />
        <Flex gap={25}>
          <Button isDisabled variant="outline" rightIcon={<FileArrowUpIcon />}>
            Export
          </Button>
          <Button isDisabled variant="outline" rightIcon={<PrinterIcon />}>
            Print
          </Button>
          <Button
            rightIcon={<CreateFolderIcon />}
            onClick={onOpenOrderModal}
            colorScheme="brand"
            px={25}
          >
            Create Folder
          </Button>
        </Flex>
      </Flex>
      {isOpenOrderModal && (
        <DynamicOrderModal
          isLoading={isPending}
          onSubmitForm={handleAddOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(ProductActions);
