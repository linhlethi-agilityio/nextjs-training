// Services
import { API_ENDPOINT, DEFAULT_LIMIT, SORT_BY, SORT_ORDER } from '@/constants';

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
      limit = DEFAULT_LIMIT,
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
        next: { tags: ['orders'] },
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
    const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS, undefined, {
      next: { tags: ['orders'] },
    });

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const getOrderById = async (id: string) => {
  try {
    const data = await api.getData<Order>(
      `${API_ENDPOINT.ORDERS}/${id}`,
      undefined,
      {
        next: { tags: ['order'] },
      },
    );

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};
