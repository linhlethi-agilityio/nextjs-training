// Services
import { API_ENDPOINT } from '@/constants';

// Models
import { Order } from '@/models';

// Services
import { api } from '@/services';

interface params {
  limit?: number;
}

export const getOrders = async (params?: params) => {
  const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS, {
    params: {
      _limit: params?.limit,
    },
  });

  return {
    data: data ?? [],
  };
};
