import { OrderDetail, OrderDetailSkeleton } from '@/components';
import { ROUTES } from '@/constants';
import { Box, Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Suspense } from 'react';

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;

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
        <BreadcrumbItem color="textDefault">
          <Link href={ROUTES.PRODUCT}>
            <Text size="md" fontWeight="light">
              Product
            </Text>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem
          isCurrentPage
          color="brand.500"
          fontSize={12}
          lineHeight={2}
          fontWeight="bold"
        >
          <Link href={ROUTES.PRODUCT}>Product Detail</Link>
        </BreadcrumbItem>
      </Breadcrumb>

      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail id={id} />
      </Suspense>
    </Box>
  );
};

export default ProductDetail;
