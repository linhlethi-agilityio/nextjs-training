import { memo } from 'react';

// Actions
import { removeOrder, updateOrder } from '@/actions';

// Api
import { getOrders } from '@/api';

// Components
import TableOrderUI from './TableOrderUI';

interface TableOrderProps {
  query: string;
  page: number;
  limit: number;
}

const TableOrder = async ({ query, page, limit }: TableOrderProps) => {
  const { data: orders = [] } = await getOrders({
    query,
    page,
    limit,
  });

  return (
    <TableOrderUI
      orders={orders.toReversed()}
      removeOrderAction={removeOrder}
      editOrderAction={updateOrder}
    />
  );
};

export default memo(TableOrder);
