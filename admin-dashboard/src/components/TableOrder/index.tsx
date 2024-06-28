'use client';

import { memo } from 'react';
import { Checkbox, Flex, Text } from '@chakra-ui/react';

// Constants
import { OPTIONS_ACTION_PRODUCT } from '@/constants';

// Icons
import { SortIcon } from '@/icons';

// Models
import { Order } from '@/models';

// Components
import { Dropdown, TableColumnType, Table } from '@/components';

interface TableOrderProps {
  orders: Order[];
}

const TableOrder = ({ orders }: TableOrderProps) => {
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
      accessor: ({ createdAt }: Order) => <Text>{createdAt}</Text>,
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

  return <Table columns={orderColumns} data={orders} isLoading={false} />;
};

export default memo(TableOrder);
