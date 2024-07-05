import { Suspense, memo } from 'react';

import { Tabs, TabList, Tab, TabPanels, Stack } from '@chakra-ui/react';

// Constants
import { SORT_BY, SORT_ORDER, TAB_LABEL_PRODUCT } from '@/constants';

// Actions
import { addOrder, removeOrder, updateOrder } from '@/actions';

// Components
import {
  TableOrder,
  ProductActions,
  ProductPagination,
  PaginationSkeleton,
  SkeletonTable,
} from '@/components';

interface ProductListProps {
  query: string;
  page: number;
  limit: number;
  sortBy: SORT_BY;
  sortOrder: SORT_ORDER;
}

const ProductList = ({
  query,
  page,
  limit,
  sortBy,
  sortOrder,
}: ProductListProps) => (
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
        <Suspense fallback={<SkeletonTable />}>
          <TableOrder
            limit={limit}
            page={page}
            query={query}
            sortBy={sortBy}
            sortOrder={sortOrder}
            removeOrderAction={removeOrder}
            editOrderAction={updateOrder}
          />
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
