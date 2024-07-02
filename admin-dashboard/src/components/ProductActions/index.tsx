'use client';

import { memo, useMemo } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Icons
import { FileArrowUpIcon, PrinterIcon, CreateFolderIcon } from '@/icons';

// Components
import { OrderModal, SearchInput } from '@/components';
import { Order } from '@/models';
import { addOrder } from '@/api';

const ProductActions = () => {
  const {
    isOpen: isOpenOrderModal,
    onOpen: onOpenOrderModal,
    onClose: onCloseOrderModal,
  } = useDisclosure();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete('page');

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const searchValue = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams],
  );

  const handleAddOrder = (data: Partial<Order>) => {
    addOrder(data);
  };

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
          <Button variant="outline" rightIcon={<FileArrowUpIcon />}>
            Export
          </Button>
          <Button variant="outline" rightIcon={<PrinterIcon />}>
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
        <OrderModal
          title="Update Order"
          handleSubmitForm={handleAddOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(ProductActions);
