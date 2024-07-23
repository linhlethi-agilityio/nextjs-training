// Api
import { getOrders } from '@/api';

// Constants
import { DEFAULT_LIMIT } from '@/constants';

// Components
import { Pagination } from '@/components';

interface ProductPaginationProps {
  limit?: number;
  query?: string;
}

const ProductPagination = async ({
  limit = DEFAULT_LIMIT,
  query = '',
}: ProductPaginationProps) => {
  const { data: orders = [] } = await getOrders({ query });

  const totalPage = Math.ceil(orders?.length / limit);

  return orders.length !== 0 && <Pagination totalPage={totalPage} />;
};

export default ProductPagination;
