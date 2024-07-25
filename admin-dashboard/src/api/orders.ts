// Services
import { API_ENDPOINT, QUERY_TAGS, SORT_BY, SORT_ORDER } from '@/constants';

// Models
import { Customer, Order } from '@/models';

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
    const { limit, query = '', page = 1, sortBy, sortOrder } = params || {};

    const { data: orders } = await api.getData<Order[]>(
      API_ENDPOINT.ORDERS,
      {
        idOrder: query,
        page,
        ...(limit && { limit }),
        ...(sortBy && sortOrder && { sortBy, order: sortOrder }),
      },
      {
        next: { tags: [QUERY_TAGS.ORDERS] },
      },
    );

    const { data: customers } = await api.getData<Customer[]>(
      API_ENDPOINT.CUSTOMERS,
    );

    const customerLookup = customers.reduce(
      (acc, customer) => {
        acc[customer.id] = customer.name;
        return acc;
      },
      {} as { [key: string]: string },
    );

    const newOrders = orders.map((order) => ({
      ...order,
      customer: customerLookup[order.customerId as string] || 'Unknown',
    }));

    return {
      data: newOrders ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const getTotalOrders = async () => {
  try {
    const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS, undefined, {
      next: { tags: [QUERY_TAGS.ORDERS] },
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
        next: { tags: [QUERY_TAGS.ORDERS] },
      },
    );

    return {
      data: data.data ?? {},
    };
  } catch (error) {
    return { error };
  }
};
