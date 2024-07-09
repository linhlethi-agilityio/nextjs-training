import { Suspense } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

// Constants
import { ROUTES, SORT_BY, SORT_ORDER } from '@/constants';

// Actions
import {
  addOrder,
  removeOrder,
  updateOrder,
  getOrderDetailById,
} from '@/actions';

// Components
import {
  PaginationSkeleton,
  ProductActions,
  ProductPagination,
  SkeletonTable,
  TableOrder,
} from '@/components';

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

      <ProductActions addOrderAction={addOrder} />

      <Tabs mt={6} border="none">
        <TabList ml={8} color="textDark" border="none" pt={2}>
          <Tab
            fontSize="lg"
            lineHeight={3}
            key="all-orders"
            aria-controls={undefined}
          >
            All Order
          </Tab>
          <Tab
            isDisabled
            fontSize="lg"
            lineHeight={3}
            key="pickup"
            aria-controls={undefined}
          >
            Pickup
          </Tab>
          <Tab
            isDisabled
            fontSize="lg"
            lineHeight={3}
            key="return"
            aria-controls={undefined}
          >
            Return
          </Tab>
        </TabList>
        <TabPanels mt={6} ml={1}>
          <Suspense fallback={<SkeletonTable />}>
            <TableOrder
              limit={limit}
              page={page}
              query={query}
              sortBy={sortBy}
              sortOrder={sortOrder}
              removeOrderAction={removeOrder}
              editOrderAction={updateOrder}
              getOrderDetail={getOrderDetailById}
            />
          </Suspense>

          <Suspense fallback={<PaginationSkeleton />}>
            <ProductPagination limit={limit} />
          </Suspense>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProductPage;
