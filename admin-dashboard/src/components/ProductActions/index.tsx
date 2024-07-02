'use client';

import { memo, useMemo } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Icons
import { FileArrowUpIcon, PrinterIcon, CreateFolderIcon } from '@/icons';

// Models
import { Order } from '@/models';

// Api
import { addOrder } from '@/api';

// Components
import { SearchInput } from '@/components';

const DynamicOrderModal = dynamic(() => import('../Modal/OrderModal'));

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

    params.set('page', '1');

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
        <DynamicOrderModal
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
