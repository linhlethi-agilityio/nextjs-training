'use client';

import { memo, MouseEvent, useCallback, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

// Icons
import { ChevronDownIcon, SortIcon } from '@/icons';

// Models
import { Order } from '@/models';

// Components
import { TableColumnType, Table, ConfirmModal, OrderModal } from '@/components';
import { removeOrder } from '@/api';
import { getColorByValue } from '@/utils';

interface TableOrderProps {
  orders: Order[];
}

const TableOrder = ({ orders }: TableOrderProps) => {
  const [previewData, setPreviewData] = useState<Order | null>(null);
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const {
    isOpen: isOpenOrderModal,
    onOpen: onOpenOrderModal,
    onClose: onCloseOrderModal,
  } = useDisclosure();

  const orderColumns: TableColumnType<Order>[] = [
    {
      header: <Checkbox size="lg" />,
      accessor: () => <Checkbox size="lg" />,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">ID Order</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: 'idOrder',
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Product</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ product }: Order) => <Text size="md">{product}</Text>,
    },
    {
      header: 'Customer',
      accessor: ({ customer }: Order) => (
        <Text textAlign="center" size="sm">
          {customer}
        </Text>
      ),
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Status</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ status }: Order) => {
        const { color, bgColor } = getColorByValue(status);

        return (
          <Text
            px={15}
            py="5px"
            color={color}
            bgColor={bgColor}
            borderRadius="2xl"
          >
            {status}
          </Text>
        );
      },
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Created Date</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ createdAt }: Order) => <Text>{createdAt}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Deadline</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ deadline }: Order) => <Text size="sm">{deadline}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Price</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ price }: Order) => <Text size="md">${price}</Text>,
    },
    {
      header: 'Action',
      accessor: (data: Order) => (
        <Menu data-order={data.id}>
          <MenuButton
            as={Button}
            color="brand.500"
            border="1px solid"
            bgColor="transparent"
            borderColor="borderDefault"
            w={88}
            h={26}
            rightIcon={<ChevronDownIcon />}
          >
            Action
          </MenuButton>
          <MenuList>
            <MenuItem data-order={data.id} onClick={handleOpenEditModal}>
              Edit
            </MenuItem>
            <MenuItem data-order={data.id} onClick={handleConfirmModal}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const onEditOrder = (selectedId: string) => {
    const currentOrder = orders?.find(({ id }) => id === selectedId);

    if (currentOrder) {
      setPreviewData(currentOrder);
      onOpenOrderModal();
    }
  };

  const handleOpenEditModal = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const id = target.dataset.order;

    id && onEditOrder(id);
  };

  const handleAddOrder = () => {
    //TODO
  };

  const openConfirmModal = (selectedId: string) => {
    const currentOrder = orders?.find(({ id }) => id === selectedId);

    if (currentOrder) {
      setPreviewData(currentOrder);
      onOpenConfirm();
    }
  };

  const handleConfirmModal = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const id = target.dataset.order;

    id && openConfirmModal(id);
  };

  const handleRemoveOrder = useCallback(() => {
    onCloseConfirm();

    if (previewData?.id) {
      removeOrder(previewData?.id);
    }
  }, [onCloseConfirm, previewData?.id]);

  return (
    <>
      <Table columns={orderColumns} data={orders} isLoading={false} />
      {isOpenConfirm && (
        <ConfirmModal
          isOpen={isOpenConfirm}
          onCancel={onCloseConfirm}
          title="Delete Order"
          description="Are you sure you would like to delete student"
          buttonLabel="Submit"
          onConfirm={handleRemoveOrder}
        />
      )}
      {isOpenOrderModal && (
        <OrderModal
          previewData={previewData}
          handleSubmitForm={handleAddOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(TableOrder);
