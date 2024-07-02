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
    const queryParams = {
      limit: params?.limit ? params.limit : 10,
      ...(params?.query && { idOrder: params.query }),
      page: params?.page ? params.page : 1,
    };

    const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS, queryParams);

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const removeOrder = async (id: string) => {
  try {
    await api.deleteData(`${API_ENDPOINT.ORDERS}/${id}`, {
      next: { tags: ['remove-order'] },
    });
  } catch (error) {
    return { error };
  }
};

export const addOrder = async (data: Partial<Order>) => {
  try {
    await api.postData(API_ENDPOINT.ORDERS, data, {
      next: { tags: ['add-order'] },
    });
  } catch (error) {
    return { error };
  }
};
