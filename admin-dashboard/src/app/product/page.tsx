import { Box, Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react';

// Constants
import { ROUTES, SORT_BY, SORT_ORDER } from '@/constants';

// Components
import { ProductList } from '@/components';
import Link from 'next/link';

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
      <Breadcrumb pl={8}>
        <BreadcrumbItem color="textDefault">
          <Link href={ROUTES.DASHBOARD}>
            <Text size="md" fontWeight="light">
              Home
            </Text>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem color="textDefault">
          <Text>..</Text>
        </BreadcrumbItem>
        <BreadcrumbItem
          isCurrentPage
          color="brand.500"
          fontSize={12}
          lineHeight={2}
          fontWeight="bold"
        >
          <Link href={ROUTES.PRODUCT}>Product</Link>
        </BreadcrumbItem>
      </Breadcrumb>

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
