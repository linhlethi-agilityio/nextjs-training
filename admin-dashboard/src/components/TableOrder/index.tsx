import { memo } from 'react';
import { Text } from '@chakra-ui/react';

// Api
import { getOrders } from '@/api';

// Constants
import { SORT_BY, SORT_ORDER } from '@/constants';

// Components
import TableOrderUI from './TableOrderUI';

// Models
import { Order } from '@/models';

interface TableOrderProps {
  query: string;
  page: number;
  limit: number;
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
  removeOrderAction: (id: string) => void;
  editOrderAction: (id: string, updateOrder: Partial<Order>) => void;
}

const TableOrder = async ({
  query,
  page,
  limit,
  sortBy,
  sortOrder,
  removeOrderAction,
  editOrderAction,
}: TableOrderProps) => {
  const { data: orders = [] } = await getOrders({
    query,
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const isSearchEmpty = !!query && !orders.length;

  return isSearchEmpty ? (
    <Text pl={7} pt={7} size="sm" textAlign="center">
      Empty search
    </Text>
  ) : (
    <TableOrderUI
      limit={limit}
      page={page}
      orders={orders}
      removeOrderAction={removeOrderAction}
      editOrderAction={editOrderAction}
      sortBy={sortBy}
      sortOrder={sortOrder}
    />
  );
};

export default memo(TableOrder);
