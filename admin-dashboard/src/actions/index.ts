'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT } from '@/constants';

// Models
import { Order } from '@/models';

// Services
import { api } from '@/services';

export const removeOrder = async (id: string) => {
  try {
    await api.deleteData(`${API_ENDPOINT.ORDERS}/${id}`);

    revalidateTag('orders');
  } catch (error) {
    return { error };
  }
};

export const updateOrder = async (id: string, updateOrder: Partial<Order>) => {
  try {
    await api.putData<Order>(`${API_ENDPOINT.ORDERS}/${id}`, updateOrder);

    revalidateTag('orders');
  } catch (error) {
    return { error };
  }
};

export const addOrder = async (data: Partial<Order>) => {
  try {
    await api.postData(API_ENDPOINT.ORDERS, data);

    revalidateTag('orders');
  } catch (error) {
    return { error };
  }
};
