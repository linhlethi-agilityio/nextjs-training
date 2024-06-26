import { memo } from 'react';
import { Button, HStack } from '@chakra-ui/react';

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onClickPage: () => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  onClickPage,
}: PaginationProps) => {
  return (
    <HStack>
      <ChevronLeftIcon />
      {Array.from({ length: totalPage }, (_, index) => {
        const active = currentPage === index + 1;

        return (
          <Button
            key={`pagination-${index}`}
            variant="pagination"
            fontWeight={active ? 'semibold' : 'normal'}
            onClick={onClickPage}
            color={active ? 'brand.500' : 'textDefault'}
          >
            {index + 1}
          </Button>
        );
      })}
      <ChevronRightIcon />
    </HStack>
  );
};

export default memo(Pagination);
