// Api
import { getCustomers } from '@/api';

// Constants
import { DEFAULT_LIMIT } from '@/constants';

// Components
import { Pagination } from '@/components';

interface ProductPaginationProps {
  limit?: number;
  query?: string;
}

const CustomersPagination = async ({
  limit = DEFAULT_LIMIT,
  query = '',
}: ProductPaginationProps) => {
  const { data: customers = [] } = await getCustomers({ query });

  const totalPage = Math.ceil(customers?.length / limit);

  return customers.length !== 0 && <Pagination totalPage={totalPage} />;
};

export default CustomersPagination;
