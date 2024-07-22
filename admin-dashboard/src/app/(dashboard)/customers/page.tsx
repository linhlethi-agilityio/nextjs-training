import Link from 'next/link';
import { Suspense } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react';

// COnstants
import { ROUTES } from '@/constants';

// Actions
import { removeCustomer } from '@/actions';

// Components
import {
  PaginationSkeleton,
  CustomersPagination,
  SkeletonTable,
  TableCustomers,
  SearchCustomers,
} from '@/components';

interface CustomersProps {
  searchParams: {
    query: string;
    page: number;
    limit: number;
  };
}

const CustomersPage = ({ searchParams }: CustomersProps) => {
  const { query, page, limit } = searchParams;

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
          <Link href={ROUTES.CUSTOMERS}>Customers</Link>
        </BreadcrumbItem>
      </Breadcrumb>

      <SearchCustomers />
      <Suspense fallback={<SkeletonTable />}>
        <TableCustomers
          limit={limit}
          page={page}
          query={query}
          removeCustomerAction={removeCustomer}
        />
      </Suspense>

      <Suspense fallback={<PaginationSkeleton />}>
        <CustomersPagination limit={limit} />
      </Suspense>
    </Box>
  );
};

export default CustomersPage;
