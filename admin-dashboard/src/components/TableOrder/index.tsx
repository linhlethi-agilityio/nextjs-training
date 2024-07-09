import { memo } from 'react';
import { Text } from '@chakra-ui/react';

// Api
import { getOrders } from '@/api';

// Constants
import {
  DEFAULT_LIMIT,
  LIMIT_PAGE,
  MESSAGES,
  SORT_BY,
  SORT_ORDER,
} from '@/constants';

// Components
import { TableOrderUI } from './TableOrderUI';

// Models
import { Order, ResponseData } from '@/models';

interface TableOrderProps {
  query: string;
  page: number;
  limit: number;
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
  removeOrderAction: (id: string) => Promise<void | string>;
  editOrderAction: (
    id: string,
    updateOrder: Partial<Order>,
  ) => Promise<void | string>;
  getOrderDetail: (id: string) => Promise<ResponseData<Order> | string>;
}

const TableOrder = async ({
  query,
  page,
  limit,
  sortBy,
  sortOrder,
  removeOrderAction,
  editOrderAction,
  getOrderDetail,
}: TableOrderProps) => {
  const isValidLimit = LIMIT_PAGE.includes(limit);

  const { data: orders = [] } = await getOrders({
    query,
    page,
    limit: isValidLimit ? limit : DEFAULT_LIMIT,
    sortBy,
    sortOrder,
  });

  const isSearchEmpty = !!query && !orders.length;

  return !orders.length ? (
    <Text pl={7} pt={7} size="sm" textAlign="center">
      {isSearchEmpty ? MESSAGES.EMPTY_SEARCH : MESSAGES.EMPTY_DATA}
    </Text>
  ) : (
    <TableOrderUI
      limit={limit}
      page={page}
      orders={orders.reverse()}
      sortBy={sortBy}
      sortOrder={sortOrder}
      removeOrderAction={removeOrderAction}
      getOrderDetail={getOrderDetail}
      editOrderAction={editOrderAction}
    />
  );
};

export default memo(TableOrder);
