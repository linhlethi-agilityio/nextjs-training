import { memo } from 'react';

// Api
import { getOrderById } from '@/api';

// Component
import OrderDetailUI from './OrderDetailUI';

interface OrderDetailProps {
  id: string;
}

const OrderDetail = async ({ id }: OrderDetailProps) => {
  const { data: order } = await getOrderById(id);

  return (
    <OrderDetailUI
      product={order?.product ?? ''}
      customer={order?.customer ?? ''}
      status={order?.status ?? ''}
      deadline={order?.deadline ?? ''}
      price={order?.price ?? 0}
      productImage={order?.productImage ?? ''}
      idOrder={order?.idOrder ?? ''}
    />
  );
};

export default memo(OrderDetail);
