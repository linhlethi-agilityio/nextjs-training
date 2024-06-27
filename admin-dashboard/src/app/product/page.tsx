'use client';

import {
  Box,
  Button,
  Flex,
  Tabs,
  Text,
  TabList,
  Tab,
  TabPanels,
  Checkbox,
  Stack,
} from '@chakra-ui/react';

// Constants
import {
  OPTIONS_ACTION_PRODUCT,
  OPTIONS_PAGINATION,
  TAB_LABEL_PRODUCT,
} from '@/constants';

// Types
import { Order } from '@/types';

// Icons
import {
  CreateFolderIcon,
  FileArrowUpIcon,
  PrinterIcon,
  SortIcon,
} from '@/icons';

// Components
import {
  Dropdown,
  Pagination,
  SearchInput,
  Table,
  TableColumnType,
} from '@/components';

const mockData: Order[] = [
  {
    id: '1',
    idOrder: '990 - 132',
    product: 'TV 14 Inch Gede',
    customer: 'Nakoyame Japan',
    status: 'Complete',
    createdDate: 'March 21, 2020 00.28',
    deadline: 'March 23, 2020',
    price: 19.09,
  },
];

const ProductPage = () => {
  const orderColumns: TableColumnType<Order>[] = [
    {
      header: <Checkbox size="lg" />,
      accessor: () => <Checkbox size="lg" />,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">ID Order</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: 'idOrder',
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Product</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ product }: Order) => <Text size="md">{product}</Text>,
    },
    {
      header: 'Customer',
      accessor: ({ customer }: Order) => <Text size="sm">{customer}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Status</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ product }: Order) => <Text>{product}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Created Date</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ createdDate }: Order) => <Text>{createdDate}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Deadline</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ deadline }: Order) => <Text size="sm">{deadline}</Text>,
    },
    {
      header: (
        <Flex textAlign="center" gap={2.5}>
          <Text color="textDefault">Price</Text>
          <SortIcon />
        </Flex>
      ),
      accessor: ({ price }: Order) => <Text size="md">${price}</Text>,
    },
    {
      header: 'Action',
      accessor: () => (
        <Dropdown
          color="brand.500"
          lineHeight="bold"
          placeholder="Action"
          onChangeValue={handleOnChangeDropdown}
          options={OPTIONS_ACTION_PRODUCT}
        />
      ),
    },
  ];

  const handleOnChangeDropdown = () => {
    //TODO: update later
  };

  const handleChangeSearchInput = () => {
    //TODO: update later
  };

  const handleOnClickPagination = () => {
    // TODO: update later
  };

  const handleChangeLimitPage = () => {
    // TODO: update later
  };

  return (
    <Box pt={19} pr={16}>
      <Text size="md" color="brand.500" ml={8}>
        Product
      </Text>
      <Flex justifyContent="space-between" mt={26} ml={8}>
        <SearchInput onChange={handleChangeSearchInput} w={465} />
        <Flex gap={25}>
          <Button variant="outline" rightIcon={<FileArrowUpIcon />}>
            Export
          </Button>
          <Button variant="outline" rightIcon={<PrinterIcon />}>
            Print
          </Button>
          <Button rightIcon={<CreateFolderIcon />} colorScheme="brand">
            Create Folder
          </Button>
        </Flex>
      </Flex>
      <Tabs colorScheme="brand" mt={6} border="none">
        <TabList ml={8} color="textDark" border="none" pt={2}>
          {TAB_LABEL_PRODUCT.map((tab: string) => (
            <Tab fontSize="lg" lineHeight={3} key={tab}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={6} ml={1}>
          <Flex
            pl={7}
            mb={4}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text color="textDefault">Showing result 101-120 Result</Text>
            <Flex alignItems="center" gap={15}>
              <Text color="textDefault">Item per page</Text>
              <Dropdown
                value="10"
                color="textDark"
                options={OPTIONS_PAGINATION}
                onChangeValue={handleChangeLimitPage}
                h={26}
                w={70}
              />
            </Flex>
          </Flex>
          <Table columns={orderColumns} data={mockData} isLoading={false} />
          <Stack textAlign="center" alignItems="center" mt={30} display="flex">
            <Pagination
              totalPage={8}
              currentPage={2}
              onClickPage={handleOnClickPagination}
            />
          </Stack>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProductPage;
