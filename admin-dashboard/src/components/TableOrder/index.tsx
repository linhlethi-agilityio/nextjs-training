import { memo } from 'react';
import { Text } from '@chakra-ui/react';

// Actions
import { removeOrder, updateOrder } from '@/actions';

// Api
import { getOrders } from '@/api';

// Constants
import { SORT_BY, SORT_ORDER } from '@/constants';

// Components
import TableOrderUI from './TableOrderUI';

interface TableOrderProps {
  query: string;
  page: number;
  limit: number;
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
}

const TableOrder = async ({
  query,
  page,
  limit,
  sortBy,
  sortOrder,
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
      orders={orders.toReversed()}
      removeOrderAction={removeOrder}
      editOrderAction={updateOrder}
      sortBy={sortBy}
      sortOrder={sortOrder}
    />
  );
};

export default memo(TableOrder);
