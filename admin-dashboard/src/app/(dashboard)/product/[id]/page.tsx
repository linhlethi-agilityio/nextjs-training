import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Box, Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Actions
import { updateOrder } from '@/actions';

// Api
import { getOrderById, getOrders } from '@/api';

// Components
import { OrderDetail, OrderDetailSkeleton } from '@/components';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export const generateStaticParams = async () => {
  const { data = [] } = await getOrders();

  return data.map(({ id }) => ({
    id,
  }));
};

export const generateMetadata = async ({
  params: { id },
}: ProductDetailPageProps): Promise<Metadata> => {
  const { data } = await getOrderById(id);

  if (!data) {
    return {};
  }

  const { product, customer, productImage } = data;

  return {
    title: product,
    authors: { name: customer },
    description:
      'This is the Product Detail page in a comprehensive e-commerce web application designed to facilitate online shopping.',

    keywords: product,
    openGraph: {
      title: product,
      description:
        'This is the Product Detail page in a comprehensive e-commerce web application designed to facilitate online shopping.',
      type: 'article',
      url: `https://nextjs-training-9355.vercel.app/product/${id}`,
      images: [
        {
          url: productImage,
          width: 800,
          height: 400,
          alt: product,
        },
      ],
    },
  };
};

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
        <OrderDetail id={id} editOrderAction={updateOrder} />
      </Suspense>
    </Box>
  );
};

export default ProductDetail;
