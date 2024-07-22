'use client';

import { memo, useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, HStack } from '@chakra-ui/react';

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnChangePage = (page: number) => {
    handleOnClickPagination(page.toString());
  };

  const handlePrevPage = () => {
    handleOnClickPagination((currentPage - 1).toString());
  };

  const handleNextPage = () => {
    handleOnClickPagination((currentPage + 1).toString());
  };

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
    <HStack justifyContent="center" my={30}>
      <Button
        variant="pagination"
        onClick={handlePrevPage}
        aria-label="pagination-prev"
        isDisabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      {Array.from({ length: totalPage }, (_, index) => {
        const active = currentPage === index + 1;

        return (
          <Button
            key={`pagination-${index}`}
            variant="pagination"
            fontWeight={active ? 'semibold' : 'normal'}
            onClick={() => handleOnChangePage(index + 1)}
            color={active ? 'brand.500' : 'textDefault'}
          >
            {index + 1}
          </Button>
        );
      })}
      <Button
        variant="pagination"
        aria-label="pagination-next"
        onClick={handleNextPage}
        isDisabled={currentPage === totalPage}
      >
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default memo(Pagination);
