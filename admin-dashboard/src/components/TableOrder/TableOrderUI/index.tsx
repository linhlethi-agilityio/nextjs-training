'use client';

import { memo, MouseEvent, useCallback, useState, useTransition } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Icons
import { ChevronDownIcon, SortIcon } from '@/icons';

// Models
import { Order, ResponseData } from '@/models';

// Utils
import { formatDateString, getColorByValue } from '@/utils';

// Constants
import {
  DEFAULT_LIMIT,
  OPTIONS_PAGINATION,
  ROUTES,
  SORT_BY,
  SORT_ORDER,
  SUCCESS_MESSAGES,
} from '@/constants';

// Components
import { TableColumnType, Table, Dropdown } from '@/components';

const DynamicOrderModal = dynamic(() => import('../../Modal/OrderModal'));
const DynamicConfirmModal = dynamic(() => import('../../Modal/ConfirmModal'));

interface TableOrderProps {
  limit?: number;
  page?: number;
  orders: Order[];
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
  getOrderDetail: (id: string) => Promise<ResponseData<Order> | string>;
  removeOrderAction: (id: string) => Promise<void | string>;
  editOrderAction: (
    id: string,
    updateOrder: Partial<Order>,
  ) => Promise<void | string>;
}

const TableOrder = ({
  limit = DEFAULT_LIMIT,
  page = 1,
  orders,
  sortBy,
  sortOrder,
  removeOrderAction,
  getOrderDetail,
  editOrderAction,
}: TableOrderProps) => {
  const [previewData, setPreviewData] = useState<Order | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  const [isPending, startTransition] = useTransition();

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
  const handleCheckChild = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { dataset } = event.currentTarget as HTMLElement;

    const itemId = dataset.id;

    if (itemId) {
      const isChecked: boolean = checkedItems.includes(itemId);

      if (isChecked) {
        return setCheckedItems(checkedItems.filter((id) => id !== itemId));
      } else {
        setCheckedItems([...checkedItems, itemId]);
      }
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
          <Button
            onClick={handleCheckChild}
            data-id={data.id}
            variant="icon"
            minW={0}
            p={0}
          >
            <Checkbox
              aria-label="Checkbox"
              as="div"
              data-id={data.id}
              size="lg"
              isChecked={!!currentChecked}
            />
          </Button>
        );
      },
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5} alignItems="center">
          <Text color="textDark">ID Order</Text>
          <Button
            variant="pagination"
            aria-label="Id-Order"
            data-id="idOrder"
            onClick={handleSort}
          >
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
      header: 'Customer',
      accessor: 'customer',
    },
    {
      header: (
        <Flex
          textAlign="center"
          gap={2.5}
          justifyContent="center"
          alignItems="center"
        >
          <Text color="textDark">Status</Text>
          <Button
            variant="pagination"
            aria-label="Status"
            data-id="status"
            onClick={handleSort}
          >
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
          <Text color="textDark">Created Date</Text>
          <Button
            variant="pagination"
            aria-label="CreatedAt"
            data-id="createdAt"
            onClick={handleSort}
          >
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
          <Text color="textDark">Deadline</Text>
          <Button
            variant="pagination"
            aria-label="Deadline"
            data-id="deadline"
            onClick={handleSort}
          >
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
          <Text color="textDark">Price</Text>
          <Button
            variant="pagination"
            aria-label="Price"
            data-id="price"
            onClick={handleSort}
          >
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
          color="textDark"
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
              onClick={(event) => event.stopPropagation()}
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

  const onEditOrder = async (selectedId: string) => {
    const response = await getOrderDetail(selectedId);

    if (typeof response !== 'string' && response.data) {
      setPreviewData(response.data);
      onOpenOrderModal();
    }
  };

  const handleOpenEditModal = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;

    const id = target.dataset.order;

    id && onEditOrder(id);
  };

  const handleEditOrder = useCallback(
    (formData: Partial<Order>) => {
      startTransition(async () => {
        const response = await editOrderAction(previewData?.id ?? '', formData);

        if (typeof response !== 'string') {
          onCloseOrderModal();
        }
      });
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
    event.stopPropagation();
    const target = event.target as HTMLElement;

    const id = target.dataset.order;

    id && openConfirmModal(id);
  };

  const handleRemoveOrder = useCallback(() => {
    if (previewData?.id) {
      startTransition(async () => {
        const response = await removeOrderAction(previewData?.id);

        if (typeof response !== 'string') {
          toast({
            title: SUCCESS_MESSAGES.REMOVE_PRODUCT_SUCCESS,
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

    if (checkedItems.length !== 0) {
      startTransition(() => {
        checkedItems.map((item) => removeOrderAction(item));

        onCloseConfirm();
      });
    }
  }, [checkedItems, onCloseConfirm, previewData?.id, removeOrderAction, toast]);

  const handleClickDeleteButton = () => {
    onOpenConfirm();
  };

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

  const handleNavigatePage = (id: string) => {
    push(`${ROUTES.PRODUCT}/${id}`);
  };

  return (
    <>
      <Flex pl={7} mb={4} justifyContent="space-between" alignItems="center">
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
      <Table
        columns={orderColumns}
        data={orders}
        onClickRow={handleNavigatePage}
      />
      {isOpenConfirm && (
        <DynamicConfirmModal
          isLoading={isPending}
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
          isLoading={isPending}
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

export const TableOrderUI = memo(TableOrder, isEqual);
