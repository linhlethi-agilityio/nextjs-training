// Services
import { API_ENDPOINT } from '@/constants';

// Models
import { Order } from '@/models';

// Services
import { api } from '@/services';

interface params {
  limit?: number;
  query?: string;
  page?: number;
}

export const getOrders = async (params?: params) => {
  try {
    const { limit = 10, query = '', page = 1 } = params || {};

    const data = await api.getData<Order[]>(
      API_ENDPOINT.ORDERS,
      {
        limit,
        idOrder: query,
        page,
      },
      {
        next: { tags: ['orders'], revalidate: 3600 },
      },
    );

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const getTotalOrders = async () => {
  try {
    const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS);

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};
