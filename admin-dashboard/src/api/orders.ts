// Services
import { API_ENDPOINT } from '@/constants';

// Models
import { Order, ResponseData } from '@/models';

// Services
import { api } from '@/services';

export const getOrders = async () => {
  const { data, ...rest } = await api.getData<ResponseData<Order[]>>(
    API_ENDPOINT.ORDERS,
  );

  return {
    data: data ?? [],
    ...rest,
  };
};
