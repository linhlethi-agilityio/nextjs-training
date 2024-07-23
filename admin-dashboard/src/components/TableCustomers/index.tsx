import { auth } from '@/auth';
import { CustomUser } from '@/auth.config';
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

const TableCustomers = async ({
  query,
  page,
  limit,
  removeCustomerAction,
}: TableOrderProps) => {
  const isValidLimit = LIMIT_PAGE.includes(Number(limit));

  const session = await auth();
  const user = session?.user as CustomUser | undefined;
  const role = user?.role ?? '';

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
      role={role}
      limit={limit}
      page={page}
      customers={customers}
      removeCustomerAction={removeCustomerAction}
    />
  );
};

export default TableCustomers;
