// Api
import { getOrderById } from '@/api';

// Models
import { Order } from '@/models';

// Component
import OrderDetailUI from './OrderDetailUI';

interface OrderDetailProps {
  id: string;
  editOrderAction: (
    id: string,
    updateOrder: Partial<Order>,
  ) => Promise<void | string>;
}

const OrderDetail = async ({ id, editOrderAction }: OrderDetailProps) => {
  const { data: order } = await getOrderById(id);

  return (
    <OrderDetailUI
      product={order?.product ?? ''}
      customerId={order?.customerId ?? ''}
      status={order?.status ?? ''}
      customer={order?.customer ?? ''}
      deadline={order?.deadline ?? ''}
      price={order?.price ?? 0}
      productImage={order?.productImage ?? ''}
      idOrder={order?.idOrder ?? ''}
      id={order?.id ?? ''}
      createdAt={order?.createdAt ?? ''}
      editOrderAction={editOrderAction}
    />
  );
};

export default OrderDetail;
