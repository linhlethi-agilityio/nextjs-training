'use server';

import { revalidateTag } from 'next/cache';

// Constants
import {
  API_ENDPOINT,
  ERROR_MESSAGES,
  IMAGE_ORDER_URL_DEFAULT,
  QUERY_TAGS,
} from '@/constants';

// Models
import { Order, ResponseData } from '@/models';

// Services
import { api } from '@/services';

// Utils
import { generateRandomId } from '@/utils';

export const removeOrder = async (id: string): Promise<void | string> => {
  try {
    await api.deleteData(`${API_ENDPOINT.ORDERS}/${id}`);

    revalidateTag(QUERY_TAGS.ORDERS);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export const updateOrder = async (id: string, updateOrder: Partial<Order>) => {
  try {
    await api.putData<Order>(`${API_ENDPOINT.ORDERS}/${id}`, updateOrder);

    revalidateTag(QUERY_TAGS.ORDERS);
    revalidateTag(QUERY_TAGS.ORDER);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export const addOrder = async (data: Partial<Order>) => {
  try {
    const formatData = {
      ...data,
      idOrder: generateRandomId(),
      createdAt: new Date().toISOString(),
      productImage: IMAGE_ORDER_URL_DEFAULT,
    };

    await api.postData(API_ENDPOINT.ORDERS, formatData);

    revalidateTag(QUERY_TAGS.ORDERS);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export const getOrderDetailById = async (
  id: string,
): Promise<ResponseData<Order> | string> => {
  try {
    const data = await api.getData<Order>(`${API_ENDPOINT.ORDERS}/${id}`);

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export const removeCustomer = async (id: string): Promise<void | string> => {
  try {
    await api.deleteData(`${API_ENDPOINT.CUSTOMERS}/${id}`);

    const { data: orders } = await api.getData<Order[]>(API_ENDPOINT.ORDERS);

    const filteredOrder = orders.filter((item) => item.customerId === id);

    filteredOrder.map((order) =>
      api.deleteData(`${API_ENDPOINT.ORDERS}/${order.id}`),
    );

    revalidateTag(QUERY_TAGS.CUSTOMERS);
    revalidateTag(QUERY_TAGS.ORDERS);
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};
