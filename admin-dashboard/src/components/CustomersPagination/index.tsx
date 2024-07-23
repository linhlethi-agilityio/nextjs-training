// Components
import { Pagination } from '@/components';

// Api
import { getTotalCustomers } from '@/api';

interface ProductPaginationProps {
  limit: number;
}

const CustomersPagination = async ({ limit }: ProductPaginationProps) => {
  const { data: totalCustomers = [] } = await getTotalCustomers();

  const totalPage = Math.ceil(totalCustomers?.length / limit);

  return <Pagination totalPage={totalPage} />;
};

export default CustomersPagination;
