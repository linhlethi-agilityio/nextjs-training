import { memo } from 'react';

// Components
import { Pagination } from '@/components';

// Api
import { getTotalCustomers } from '@/api';

// Constants
import { DEFAULT_LIMIT } from '@/constants';

interface ProductPaginationProps {
  limit: number;
}

const CustomersPagination = async ({ limit }: ProductPaginationProps) => {
  const { data: totalCustomers = [] } = await getTotalCustomers();

  const totalPage = Math.ceil(
    totalCustomers?.length / (limit ?? DEFAULT_LIMIT),
  );

  return <Pagination totalPage={totalPage} />;
};

export default memo(CustomersPagination);
