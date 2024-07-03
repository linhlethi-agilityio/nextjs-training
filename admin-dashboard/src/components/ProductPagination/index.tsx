import { memo } from 'react';

// Components
import ProductPaginationUI from './ProductPaginationUI';
import { getTotalOrders } from '@/api';

interface ProductPaginationProps {
  limit: number;
}

const ProductPagination = async ({ limit }: ProductPaginationProps) => {
  const { data: totalOrders = [] } = await getTotalOrders();

  const totalPage = Math.ceil(totalOrders?.length / (limit ?? 10));

  return <ProductPaginationUI totalPage={totalPage} />;
};

export default memo(ProductPagination);
