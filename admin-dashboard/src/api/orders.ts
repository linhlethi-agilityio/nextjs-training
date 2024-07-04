// Services
import { API_ENDPOINT, SORT_BY, SORT_ORDER } from '@/constants';

// Models
import { Order } from '@/models';

// Services
import { api } from '@/services';

interface params {
  limit?: number;
  query?: string;
  page?: number;
  sortBy?: SORT_BY;
  sortOrder?: SORT_ORDER;
}

export const getOrders = async (params?: params) => {
  try {
    const {
      limit = 10,
      query = '',
      page = 1,
      sortBy,
      sortOrder,
    } = params || {};

    const data = await api.getData<Order[]>(
      API_ENDPOINT.ORDERS,
      {
        limit,
        idOrder: query,
        page,
        ...(sortBy && sortOrder && { sortBy, order: sortOrder }),
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
