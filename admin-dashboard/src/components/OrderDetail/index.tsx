'use client';

import { memo, useTransition } from 'react';
import dynamic from 'next/dynamic';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

// Constants
import { BLUR_DATA_URL } from '@/constants';

// Utils
import { formatDateString, getColorByValue } from '@/utils';

// Models
import { Order } from '@/models';

// Components
import { ImageFallback } from '@/components';

const DynamicOrderModal = dynamic(() => import('../Modal/OrderModal'));

interface OrderDetailProps {
  product: string;
  customerId?: string;
  customer?: string;
  status: string;
  deadline: string;
  productImage: string;
  price: number;
  createdAt: string;
  idOrder: string;
  id: string;
  editOrderAction: (
    id: string,
    updateOrder: Partial<Order>,
  ) => Promise<void | string>;
}

const OrderDetail = ({
  product,
  customerId,
  status,
  deadline,
  id,
  price,
  customer,
  createdAt,
  idOrder,
  productImage,
  editOrderAction,
}: OrderDetailProps) => {
  const { color, bgColor } = getColorByValue(status);
  const [isPending, startTransition] = useTransition();

  const previewData = {
    product,
    customerId,
    status,
    deadline,
    price,
    id,
    idOrder,
    createdAt,
    productImage,
  };

  const {
    isOpen: isOpenOrderModal,
    onOpen: onOpenOrderModal,
    onClose: onCloseOrderModal,
  } = useDisclosure();

  const handleEditOrder = (formData: Partial<Order>) => {
    startTransition(async () => {
      const response = await editOrderAction(previewData?.id ?? '', formData);

      if (typeof response !== 'string') {
        onCloseOrderModal();
      }
    });
  };

  return (
    <>
      <Flex mt={46} ml={8}>
        <ImageFallback
          src={productImage}
          alt={product}
          width={700}
          height={300}
          fallbackSrc={BLUR_DATA_URL}
        />
        <Stack flex={1} px={30} pt={4}>
          <Heading fontSize={30}>{product}</Heading>
          <Flex gap={3}>
            <Text>Customer name:</Text>
            <Text>{customer}</Text>
          </Flex>
          <Flex gap={3}>
            <Text>SKU:</Text>
            <Text>{idOrder}</Text>
          </Flex>
          <Flex alignItems="center" textAlign="center" gap={3} mt={27}>
            <Text>Status:</Text>
            <Text
              px={15}
              py="5px"
              color={color}
              bgColor={bgColor}
              borderRadius="2xl"
              textAlign="center"
            >
              {status}
            </Text>
          </Flex>
          <Heading mt={27}>${price}</Heading>
          <Flex gap={3} mt={3}>
            <Text>Deadline:</Text>
            <Text>{formatDateString(deadline)}</Text>
          </Flex>
          <Button
            mt="auto"
            maxW={200}
            colorScheme="brand"
            onClick={onOpenOrderModal}
          >
            Edit
          </Button>
        </Stack>
      </Flex>
      {isOpenOrderModal && (
        <DynamicOrderModal
          isLoading={isPending}
          title="Update Order"
          previewData={previewData}
          onSubmitForm={handleEditOrder}
          isOpen={isOpenOrderModal}
          onClose={onCloseOrderModal}
        />
      )}
    </>
  );
};

export default memo(OrderDetail);
