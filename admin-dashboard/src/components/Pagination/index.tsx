import { memo } from 'react';
import { Button, HStack } from '@chakra-ui/react';

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onClickPage: (page: string) => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  onClickPage,
}: PaginationProps) => {
  const handleOnChangePage = (page: number) => {
    onClickPage(page.toString());
  };

  const handlePrevPage = () => {
    onClickPage((currentPage - 1).toString());
  };

  const handleNextPage = () => {
    onClickPage((currentPage + 1).toString());
  };

  return (
    <HStack>
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
