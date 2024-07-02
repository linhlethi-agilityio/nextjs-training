import { memo } from 'react';

import { Tabs, TabList, Tab, TabPanels, Stack } from '@chakra-ui/react';

// Constants
import { TAB_LABEL_PRODUCT } from '@/constants';

// Api
import { getOrders } from '@/api';

// Components
import {
  TableOrder,
  ProductActions,
  ProductLimit,
  ProductPagination,
} from '@/components';

interface ProductListProps {
  query: string;
  page: number;
  limit: number;
}

const ProductList = async ({ query, page, limit }: ProductListProps) => {
  const { data: orders = [] } = await getOrders({
    query,
    page,
    limit,
  });

  return (
    <>
      <ProductActions />
      <Tabs colorScheme="brand" mt={6} border="none">
        <TabList ml={8} color="textDark" border="none" pt={2}>
          {TAB_LABEL_PRODUCT.map((tab) => (
            <Tab fontSize="lg" lineHeight={3} key={tab}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={6} ml={1}>
          <ProductLimit limit={limit} />
          <TableOrder orders={orders} />

          <Stack textAlign="center" alignItems="center" mt={30} display="flex">
            <ProductPagination totalPage={2} />
          </Stack>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default memo(ProductList);
