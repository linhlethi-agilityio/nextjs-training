import { memo } from 'react';

// Api
import { getTotalOrders } from '@/api';

// Constants
import { DEFAULT_LIMIT } from '@/constants';

// Components
import { Pagination } from '@/components';

interface ProductPaginationProps {
  limit: number;
}

const ProductPagination = async ({ limit }: ProductPaginationProps) => {
  const { data: totalOrders = [] } = await getTotalOrders();

  const totalPage = Math.ceil(totalOrders?.length / (limit ?? DEFAULT_LIMIT));

  return <Pagination totalPage={totalPage} />;
};

export default memo(ProductPagination);
