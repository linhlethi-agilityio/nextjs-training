import { Suspense } from 'react';
import {
  Box,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanels,
  Stack,
} from '@chakra-ui/react';

// Constants
import { TAB_LABEL_PRODUCT } from '@/constants';

// Apis
import { getOrders } from '@/api';

// Components
import {
  LoadingIndicator,
  ProductActions,
  ProductLimit,
  ProductPagination,
  TableOrder,
} from '@/components';

const ProductPage = async () => {
  const { data } = await getOrders();

  return (
    <Box pt={19} pr={16}>
      <Text size="md" color="brand.500" ml={8}>
        Product
      </Text>
      <ProductActions />
      <Tabs colorScheme="brand" mt={6} border="none">
        <TabList ml={8} color="textDark" border="none" pt={2}>
          {TAB_LABEL_PRODUCT.map((tab: string) => (
            <Tab fontSize="lg" lineHeight={3} key={tab}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={6} ml={1}>
          <ProductLimit />
          <TableOrder orders={data} />

          <Stack textAlign="center" alignItems="center" mt={30} display="flex">
            <ProductPagination totalPage={8} />
          </Stack>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProductPage;
