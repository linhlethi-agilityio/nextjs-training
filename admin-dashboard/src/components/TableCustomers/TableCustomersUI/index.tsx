'use client';

import { memo, MouseEvent, useCallback, useState, useTransition } from 'react';
// import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Models
import { Customer } from '@/models';

// Utils
import { formatDateString } from '@/utils';

// Constants
import {
  DEFAULT_LIMIT,
  OPTIONS_PAGINATION,
  SUCCESS_MESSAGES,
} from '@/constants';

// Components
import { TableColumnType, Table, Dropdown } from '@/components';

const DynamicConfirmModal = dynamic(() => import('../../Modal/ConfirmModal'));

interface TableCustomersProps {
  limit?: number;
  page?: number;
  customers: Customer[];
  removeCustomerAction: (id: string) => Promise<void | string>;
}

const TableCustomers = ({
  limit = DEFAULT_LIMIT,
  page = 1,
  customers,
  removeCustomerAction,
}: TableCustomersProps) => {
  const [previewData, setPreviewData] = useState<Customer | null>(null);
  // const { data: session } = useSession();
  // console.log('session', session);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  const [isPending, startTransition] = useTransition();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const customersColumns: TableColumnType<Customer>[] = [
    {
      accessor: () => (
        <Box>
          <Avatar w={8} h={8} />
        </Box>
      ),
    },
    {
      header: 'name',
      accessor: (data: Customer) => (
        <Text fontSize="md" fontWeight="bold">
          {data.name}
        </Text>
      ),
    },
    {
      header: 'email',
      accessor: (data: Customer) => `${data.email}`,
    },
    {
      header: 'phone number',
      accessor: (data: Customer) => `${data.phoneNumber}`,
    },
    {
      header: 'created',
      accessor: (data: Customer) => `${formatDateString(data.createdAt, true)}`,
    },
    {
      header: 'action',
      accessor: (data: Customer) => (
        <Button
          variant="icon"
          color="brand.500"
          p={0}
          data-id={data.id}
          aria-label="EditCustomer"
          _hover={{ color: 'brand.300' }}
          onClick={handleConfirmModal}
        >
          delete
        </Button>
      ),
    },
  ];

  const openConfirmModal = (selectedId: string) => {
    const currentCustomer = customers?.find(({ id }) => id === selectedId);

    if (currentCustomer) {
      setPreviewData(currentCustomer);
      onOpenConfirm();
    }
  };

  const handleConfirmModal = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const id = target.dataset.id;

    id && openConfirmModal(id);
  };

  const handleRemoveOrder = useCallback(() => {
    if (previewData?.id) {
      startTransition(async () => {
        const response = await removeCustomerAction(previewData?.id);

        if (typeof response !== 'string') {
          toast({
            title: SUCCESS_MESSAGES.REMOVE_CUSTOMER_SUCCESS,
            status: 'success',
          });
          return onCloseConfirm();
        } else {
          toast({
            title: response,
            status: 'error',
          });
        }
      });
    }
  }, [onCloseConfirm, previewData?.id, removeCustomerAction, toast]);

  const startResult = (page - 1) * limit + 1;
  const endResult = page * limit;

  /**
   * Function handle change limit page
   */
  const handleChangeLimitPage = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('limit', value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Flex
        pl={8}
        mb={4}
        mt={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color="textDark">
          Showing result {startResult}-{endResult} Result
        </Text>

        <Flex alignItems="center" gap={15}>
          <Text color="textDark">Item per page</Text>
          <Dropdown
            value={searchParams.get('limit') ?? ''}
            color="textDark"
            options={OPTIONS_PAGINATION}
            onChangeValue={handleChangeLimitPage}
            h={26}
            w={70}
          />
        </Flex>
      </Flex>
      <Box ml={1}>
        <Table columns={customersColumns} data={customers} />
      </Box>

      {isOpenConfirm && (
        <DynamicConfirmModal
          isLoading={isPending}
          isOpen={isOpenConfirm}
          onCancel={onCloseConfirm}
          title="Delete Customer"
          description="Are you sure you would like to delete customer"
          buttonLabel="Submit"
          onConfirm={handleRemoveOrder}
        />
      )}
    </>
  );
};

export const TableCustomersUI = memo(TableCustomers, isEqual);
