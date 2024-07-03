import { Button, HStack, Skeleton as SkeletonBase } from '@chakra-ui/react';

// Icons
import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

const PaginationSkeleton = () => (
  <HStack>
    <Button variant="pagination">
      <ChevronLeftIcon />
    </Button>
    {Array.from({ length: 3 }, (_, index) => (
      <SkeletonBase key={`pagination-${index}`} h={5} w={17} borderRadius={1} />
    ))}
    <Button variant="pagination">
      <ChevronRightIcon />
    </Button>
  </HStack>
);

export default PaginationSkeleton;
