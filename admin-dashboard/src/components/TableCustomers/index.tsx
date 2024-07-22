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
  const isValidLimit = LIMIT_PAGE.includes(Number(limit));

  const { data: customers = [] } = await getCustomers({
    query,
    page,
    limit: isValidLimit ? limit : DEFAULT_LIMIT,
  });

  const isSearchEmpty = !!query && !customers.length;

  return !customers.length ? (
    <Text pl={7} pt={7} size="sm" textAlign="center">
      {isSearchEmpty ? MESSAGES.EMPTY_SEARCH : MESSAGES.EMPTY_DATA}
    </Text>
  ) : (
    <TableCustomersUI
      limit={limit}
      page={page}
      customers={customers}
      removeCustomerAction={removeCustomerAction}
    />
  );
};

export default memo(TableOrder);
