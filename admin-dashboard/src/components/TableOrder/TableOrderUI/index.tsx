'use client';

import { memo, MouseEvent, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Box,
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

// Constants
import { SORT_BY, SORT_ORDER } from '@/constants';

// Components
import { TableColumnType, Table } from '@/components';

const DynamicOrderModal = dynamic(() => import('../../Modal/OrderModal'));
const DynamicConfirmModal = dynamic(() => import('../../Modal/ConfirmModal'));

interface TableOrderProps {
  orders: Order[];
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
  removeOrderAction: (id: string) => void;
  editOrderAction: (id: string, updateOrder: Partial<Order>) => void;
}

const TableOrderUI = ({
  orders,
  sortBy,
  sortOrder,
  removeOrderAction,
  editOrderAction,
}: TableOrderProps) => {
  const [previewData, setPreviewData] = useState<Order | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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

  /**
   * Function handle click checkbox
   */
  const handleCheckChild = (itemId: string) => {
    const isChecked: boolean = checkedItems.includes(itemId);

    if (isChecked) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  /**
   * Function handle click checkbox
   */
  const handleCheckParent = () => {
    const isChecked: boolean = checkedItems.length !== 0;

    if (!isChecked || checkedItems.length !== orders.length) {
      const data = orders.map((order) => order.id);

      setCheckedItems(data);
    } else if (checkedItems.length === orders.length) setCheckedItems([]);
  };

  const handleSort = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const column = target.dataset.id;

    const params = new URLSearchParams(searchParams);

    if (column) {
      params.set('sortBy', column);

      if (!sortOrder) {
        params.set('sortOrder', SORT_ORDER.ASC);
      }

      if (sortOrder) {
        if (sortOrder === SORT_ORDER.DESC) {
          params.delete('sortBy');
          params.delete('sortOrder');

          return replace(`${pathname}?${params.toString()}`);
        }

        params.set(
          'sortOrder',
          sortOrder === SORT_ORDER.ASC && sortBy === column
            ? SORT_ORDER.DESC
            : SORT_ORDER.ASC,
        );

        return replace(`${pathname}?${params.toString()}`);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const orderColumns: TableColumnType<Order>[] = [
    {
      header: (
        <Checkbox
          aria-label="Checkbox"
          borderRadius="md"
          isChecked={checkedItems.length === orders.length}
          size="lg"
          onChange={handleCheckParent}
        />
      ),
      accessor: (data: Order) => {
        const currentChecked = checkedItems.find((id) => id === data.id);

        return (
          <Checkbox
            aria-label="Checkbox"
            size="lg"
            isChecked={!!currentChecked}
            onChange={() => handleCheckChild(data.id)}
          />
        );
      },
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5} alignItems="center">
          <Text color="textDefault">ID Order</Text>
          <Button variant="pagination" data-id="idOrder" onClick={handleSort}>
            <SortIcon data-id="idOrder" />
          </Button>
        </Flex>
      ),
      accessor: 'idOrder',
    },
    {
      header: 'Product',
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
        <Flex
          textAlign="center"
          gap={2.5}
          justifyContent="center"
          alignItems="center"
        >
          <Text color="textDefault">Status</Text>
          <Button variant="pagination" data-id="status" onClick={handleSort}>
            <SortIcon data-id="status" />
          </Button>
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
        <Flex textAlign="center" gap={2.5} alignItems="center">
          <Text color="textDefault">Created Date</Text>
          <Button variant="pagination" data-id="createdAt" onClick={handleSort}>
            <SortIcon data-id="createdAt" />
          </Button>
        </Flex>
      ),
      accessor: ({ createdAt }: Order) => (
        <Text>{formatDateString(createdAt, true)}</Text>
      ),
    },
    {
      header: (
        <Flex
          textAlign="center"
          gap={2.5}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="textDefault">Deadline</Text>
          <Button variant="pagination" data-id="deadline" onClick={handleSort}>
            <SortIcon data-id="deadline" />
          </Button>
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
        <Flex textAlign="center" gap={2.5} alignItems="center">
          <Text color="textDefault">Price</Text>
          <Button variant="pagination" data-id="price" onClick={handleSort}>
            <SortIcon data-id="price" />
          </Button>
        </Flex>
      ),
      accessor: ({ price }: Order) => (
        <Text size="md">${Number(price).toFixed(2)}</Text>
      ),
    },
    {
      header: (
        <Text
          textAlign="center"
          size="sm"
          color="textDefault"
          justifyContent="center"
        >
          Action
        </Text>
      ),
      accessor: (data: Order) => (
        <Box textAlign="center">
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
        </Box>
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

  const handleEditOrder = useCallback(
    (formData: Partial<Order>) => {
      onCloseOrderModal();

      editOrderAction(previewData?.id ?? '', formData);
    },
    [editOrderAction, onCloseOrderModal, previewData?.id],
  );

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
      return removeOrderAction(previewData?.id);
    }

    if (checkedItems.length !== 0) {
      checkedItems.map((item) => removeOrderAction(item));
    }
  }, [checkedItems, onCloseConfirm, previewData?.id, removeOrderAction]);

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
        <DynamicConfirmModal
          isOpen={isOpenConfirm}
          onCancel={onCloseConfirm}
          title="Delete Order"
          description="Are you sure you would like to delete order"
          buttonLabel="Submit"
          onConfirm={handleRemoveOrder}
        />
      )}
      {isOpenOrderModal && (
        <DynamicOrderModal
          title="Update Order"
          previewData={previewData}
          onSubmitForm={handleEditOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(TableOrderUI);
