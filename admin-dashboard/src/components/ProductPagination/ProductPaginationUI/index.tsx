'use client';

import { memo, useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { Pagination } from '@/components';

interface ProductPaginationProps {
  totalPage: number;
}

const ProductPaginationUI = ({ totalPage }: ProductPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const currentPage = useMemo(
    () => (searchParams.get('page') ? Number(searchParams.get('page')) : 1),
    [searchParams],
  );

  const handleOnClickPagination = useCallback(
    (page: string) => {
      params.set('page', page);

      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  return (
    <Pagination
      totalPage={totalPage}
      onClickPage={handleOnClickPagination}
      currentPage={currentPage}
    />
  );
};

export default memo(ProductPaginationUI);
