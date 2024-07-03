import { Suspense, memo } from 'react';

import { Tabs, TabList, Tab, TabPanels, Stack } from '@chakra-ui/react';

// Constants
import { TAB_LABEL_PRODUCT } from '@/constants';

// Actions
import { addOrder } from '@/actions';

// Components
import {
  TableOrder,
  ProductActions,
  OrderHeader,
  ProductPagination,
  PaginationSkeleton,
  SkeletonTable,
} from '@/components';

interface ProductListProps {
  query: string;
  page: number;
  limit: number;
}

const ProductList = async ({ query, page, limit }: ProductListProps) => (
  <>
    <ProductActions addOrderAction={addOrder} />
    <Tabs colorScheme="brand" mt={6} border="none">
      <TabList ml={8} color="textDark" border="none" pt={2}>
        {TAB_LABEL_PRODUCT.map((tab) => (
          <Tab fontSize="lg" lineHeight={3} key={tab}>
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanels mt={6} ml={1}>
        <OrderHeader limit={limit} />

        <Suspense fallback={<SkeletonTable />}>
          <TableOrder limit={limit} page={page} query={query} />
        </Suspense>

        <Stack textAlign="center" alignItems="center" mt={30} display="flex">
          <Suspense fallback={<PaginationSkeleton />}>
            <ProductPagination limit={limit} />
          </Suspense>
        </Stack>
      </TabPanels>
    </Tabs>
  </>
);

export default memo(ProductList);
