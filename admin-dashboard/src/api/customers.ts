import { API_ENDPOINT, DEFAULT_LIMIT } from '@/constants';
import { Customer } from '@/models';
import { api } from '@/services';

interface params {
  limit?: number;
  query?: string;
  page?: number;
}

export const getCustomers = async (params?: params) => {
  try {
    const { limit = DEFAULT_LIMIT, query = '', page = 1 } = params || {};

    const data = await api.getData<Customer[]>(
      API_ENDPOINT.CUSTOMERS,
      {
        limit,
        name: query,
        page,
      },
      {
        next: { tags: ['customers'], revalidate: 3600 },
      },
    );

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};

export const getTotalCustomers = async () => {
  try {
    const data = await api.getData<Customer[]>(
      API_ENDPOINT.CUSTOMERS,
      undefined,
      {
        next: { tags: ['customers'], revalidate: 3600 },
      },
    );

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};
