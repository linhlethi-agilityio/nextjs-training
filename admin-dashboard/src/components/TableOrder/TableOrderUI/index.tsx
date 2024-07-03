'use client';

import { memo, MouseEvent, useState } from 'react';
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

// Utils
import { formatDateString, getColorByValue } from '@/utils';

// Components
import { TableColumnType, Table, ConfirmModal, OrderModal } from '@/components';

interface TableOrderProps {
  orders: Order[];
  removeOrderAction: (id: string) => void;
  editOrderAction: (id: string, updateOrder: Partial<Order>) => void;
}

const TableOrderUI = ({
  orders,
  removeOrderAction,
  editOrderAction,
}: TableOrderProps) => {
  const [previewData, setPreviewData] = useState<Order | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

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

  const handleCheckChild = (itemId: string) => {
    const isChecked: boolean = checkedItems.includes(itemId);

    if (isChecked) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const handleCheckParent = () => {
    const isChecked: boolean = checkedItems.length !== 0;

    if (!isChecked) {
      const data = orders.map((order) => order.id);

      setCheckedItems(data);
    } else setCheckedItems([]);
  };

  const orderColumns: TableColumnType<Order>[] = [
    {
      header: (
        <Checkbox
          isChecked={checkedItems.length === orders.length}
          size="lg"
          onChange={handleCheckParent}
        />
      ),
      accessor: (data: Order) => {
        const currentChecked = checkedItems.find((id) => id === data.id);

        return (
          <Checkbox
            size="lg"
            isChecked={!!currentChecked}
            onChange={() => handleCheckChild(data.id)}
          />
        );
      },
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
      header: (
        <Text textAlign="center" size="sm" color="textDefault">
          Customer
        </Text>
      ),
      accessor: ({ customer }: Order) => (
        <Text textAlign="center" size="sm">
          {customer}
        </Text>
      ),
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5} justifyContent="center">
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
            textAlign="center"
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
      accessor: ({ createdAt }: Order) => (
        <Text>{formatDateString(createdAt, true)}</Text>
      ),
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5} justifyContent="center">
          <Text color="textDefault">Deadline</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ deadline }: Order) => (
        <Text size="sm" textAlign="center">
          {formatDateString(deadline)}
        </Text>
      ),
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Price</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ price }: Order) => (
        <Text size="md">${Number(price).toFixed(2)}</Text>
      ),
    },
    {
      header: (
        <Text textAlign="center" size="sm" color="textDefault">
          Action
        </Text>
      ),
      accessor: (data: Order) => (
        <Menu data-order={data.id}>
          <MenuButton
            as={Button}
            color="brand.500"
            border="1px solid"
            textAlign="center"
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

  const handleEditOrder = (formData: Partial<Order>) => {
    onCloseOrderModal();

    editOrderAction(previewData?.id ?? '', formData);
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

  const handleRemoveOrder = async () => {
    onCloseConfirm();

    if (previewData?.id) {
      return removeOrderAction(previewData?.id);
    }

    if (checkedItems.length !== 0) {
      checkedItems.map((item) => removeOrderAction(item));
    }
  };

  const handleClickDeleteButton = () => {
    onOpenConfirm();
  };

  return (
    <>
      <Button
        color="brand.500"
        isDisabled={checkedItems.length === 0}
        onClick={handleClickDeleteButton}
        position="absolute"
        right={170}
        top={61}
      >
        Delete Orders
      </Button>
      <Table columns={orderColumns} data={orders} />
      {isOpenConfirm && (
        <ConfirmModal
          isOpen={isOpenConfirm}
          onCancel={onCloseConfirm}
          title="Delete Order"
          description="Are you sure you would like to delete order"
          buttonLabel="Submit"
          onConfirm={handleRemoveOrder}
        />
      )}
      {isOpenOrderModal && (
        <OrderModal
          title="Update Order"
          previewData={previewData}
          handleSubmitForm={handleEditOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(TableOrderUI);
