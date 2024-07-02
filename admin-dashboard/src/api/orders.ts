// Services
import { API_ENDPOINT, ROUTES } from '@/constants';

// Models
import { Order } from '@/models';

// Services
import { api } from '@/services';
import { revalidatePath } from 'next/cache';

interface params {
  limit?: number;
  query?: string;
  page?: number;
}

export const getOrders = async (params?: params) => {
  try {
    const data = await api.getData<Order[]>(API_ENDPOINT.ORDERS, {
      params: {
        limit: params?.limit || 10,
        idOrder: params?.query,
        page: params?.page,
      },
    });

    return {
      data: data ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const removeOrder = async (id: string) => {
  try {
    await api.deleteData(`${API_ENDPOINT.ORDERS}/${id}`);

    revalidatePath(ROUTES.PRODUCT);
  } catch (error) {
    return { error };
  }
};

export const addOrder = async (data: Partial<Order>) => {
  try {
    await api.postData(API_ENDPOINT.ORDERS, { arg: data });

    revalidatePath(ROUTES.PRODUCT);
  } catch (error) {
    return { error };
  }
};
