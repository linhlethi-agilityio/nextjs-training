import { Flex, Stack, Heading, Text, Skeleton } from '@chakra-ui/react';

const OrderDetailSkeleton = () => (
  <Flex mt={46} ml={8}>
    <Skeleton width={700} height={300} />
    <Stack flex={1} px={30} pt={4}>
      <Heading fontSize={30}>
        <Skeleton height={10} />
      </Heading>
      <Flex gap={3}>
        <Text>Customer name:</Text>
        <Skeleton height={5} width={100} />
      </Flex>
      <Flex gap={3}>
        <Text>SKU:</Text>
        <Skeleton height={5} width={100} />
      </Flex>
      <Flex alignItems="center" textAlign="center" gap={3} mt={27}>
        <Text>Status:</Text>
        <Skeleton height={4} width={100} borderRadius="2xl" />
      </Flex>
      <Heading mt={27}>
        <Skeleton height={10} width={100} />
      </Heading>
      <Flex gap={3} mt={3}>
        <Text>Deadline:</Text>
        <Skeleton height={4} width={100} />
      </Flex>
      <Skeleton height={4} width={200} mt="auto" />
    </Stack>
  </Flex>
);

export default OrderDetailSkeleton;
