'use client';

import { memo } from 'react';

// Components
import { Pagination } from '@/components';

interface ProductPaginationProps {
  totalPage: number;
}

const ProductPagination = ({ totalPage }: ProductPaginationProps) => {
  const handleOnClickPagination = () => {
    // TODO: update later
  };

  //TODO: update later
  const currentPage = 2;

  return (
    <Pagination
      totalPage={totalPage}
      onClickPage={handleOnClickPagination}
      currentPage={currentPage}
    />
  );
};

export default memo(ProductPagination);
