import { API_ENDPOINT, QUERY_TAGS } from '@/constants';

// Models
import { Customer } from '@/models';

// Services
import { api } from '@/services';

interface params {
  limit?: number;
  query?: string;
  page?: number;
}

export const getCustomers = async (params?: params) => {
  try {
    const { limit, query = '', page = 1 } = params || {};

    const data = await api.getData<Customer[]>(
      API_ENDPOINT.CUSTOMERS,
      {
        name: query,
        page,
        ...(limit && { limit }),
      },
      {
        next: { tags: [QUERY_TAGS.CUSTOMERS] },
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
        next: { tags: [QUERY_TAGS.CUSTOMERS] },
      },
    );

    return {
      data: data.data ?? [],
    };
  } catch (error) {
    return { error };
  }
};
