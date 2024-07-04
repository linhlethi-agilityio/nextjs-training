import { Box, Text } from '@chakra-ui/react';

// Constants
import { SORT_BY, SORT_ORDER } from '@/constants';

// Components
import { ProductList } from '@/components';

interface ProductProps {
  searchParams: {
    query: string;
    page: number;
    limit: number;
    sortBy: SORT_BY;
    sortOrder: SORT_ORDER;
  };
}

const ProductPage = async ({ searchParams }: ProductProps) => {
  const { query, page, limit, sortBy, sortOrder } = searchParams;

  return (
    <Box pt={19} pr={16}>
      <Text size="md" color="brand.500" ml={8}>
        Product
      </Text>

      <ProductList
        query={query}
        page={page}
        limit={limit}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </Box>
  );
};

export default ProductPage;
