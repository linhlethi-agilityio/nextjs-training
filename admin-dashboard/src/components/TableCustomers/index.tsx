import { memo } from 'react';
import { Text } from '@chakra-ui/react';

// Api
import { getCustomers } from '@/api';

// Constants
import { DEFAULT_LIMIT, LIMIT_PAGE, MESSAGES } from '@/constants';

// Components
import { TableCustomersUI } from './TableCustomersUI';

interface TableOrderProps {
  query: string;
  page: number;
  limit: number;
  removeCustomerAction: (id: string) => Promise<void | string>;
}

const TableOrder = async ({
  query,
  page,
  limit,
  removeCustomerAction,
}: TableOrderProps) => {
  const isValidLimit = LIMIT_PAGE.includes(limit);

  const { data: orders = [] } = await getCustomers({
    query,
    page,
    limit: isValidLimit ? limit : DEFAULT_LIMIT,
  });

  const isSearchEmpty = !!query && !orders.length;

  return !orders.length ? (
    <Text pl={7} pt={7} size="sm" textAlign="center">
      {isSearchEmpty ? MESSAGES.EMPTY_SEARCH : MESSAGES.EMPTY_DATA}
    </Text>
  ) : (
    <TableCustomersUI
      limit={limit}
      page={page}
      customers={orders}
      removeCustomerAction={removeCustomerAction}
    />
  );
};

export default memo(TableOrder);
