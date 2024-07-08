'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT } from '@/constants';

// Models
import { Order, ResponseData } from '@/models';

// Services
import { api } from '@/services';

// Utils
import { generateRandomId } from '@/utils';

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
    const formatData = {
      ...data,
      idOrder: generateRandomId(),
      createdAt: new Date().toISOString(),
    };

    await api.postData(API_ENDPOINT.ORDERS, formatData);

    revalidateTag('orders');
  } catch (error) {
    return { error };
  }
};

export const getOrderDetailById = async (
  id: string,
): Promise<ResponseData<Order>> => {
  try {
    const data = await api.getData<Order>(`${API_ENDPOINT.ORDERS}/${id}`);

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};
