import { memo } from 'react';

// Components
import ProductPaginationUI from './ProductPaginationUI';

// Api
import { getTotalOrders } from '@/api';

// Constants
import { DEFAULT_LIMIT } from '@/constants';

interface ProductPaginationProps {
  limit: number;
}

const ProductPagination = async ({ limit }: ProductPaginationProps) => {
  const { data: totalOrders = [] } = await getTotalOrders();

  const totalPage = Math.ceil(totalOrders?.length / (limit ?? DEFAULT_LIMIT));

  return <ProductPaginationUI totalPage={totalPage} />;
};

export default memo(ProductPagination);
