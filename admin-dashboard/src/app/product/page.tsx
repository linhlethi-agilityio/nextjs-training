import { Box, Text } from '@chakra-ui/react';

// Components
import { ProductList } from '@/components';

interface ProductProps {
  searchParams: {
    query: string;
    page: number;
  };
}

const ProductPage = async ({ searchParams }: ProductProps) => {
  const { query, page } = searchParams;

  return (
    <Box pt={19} pr={16}>
      <Text size="md" color="brand.500" ml={8}>
        Product
      </Text>
      <ProductList query={query} page={page} />
    </Box>
  );
};

export default ProductPage;
