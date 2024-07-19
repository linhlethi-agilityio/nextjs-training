import Image from 'next/image';
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

// Utils
import { formatDateString, getColorByValue } from '@/utils';

interface OrderDetailUIProps {
  product: string;
  customer: string;
  status: string;
  deadline: string;
  productImage: string;
  price: number;
  idOrder: string;
}

const OrderDetailUI = ({
  product,
  customer,
  status,
  deadline,
  price,
  idOrder,
  productImage,
}: OrderDetailUIProps) => {
  const { color, bgColor } = getColorByValue(status);

  return (
    <Flex mt={46} ml={8}>
      <Image src={productImage} alt={product} width={700} height={300} />
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
        <Button mt="auto" maxW={200} colorScheme="brand">
          Edit
        </Button>
      </Stack>
    </Flex>
  );
};

export default OrderDetailUI;
