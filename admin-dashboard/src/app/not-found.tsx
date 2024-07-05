// Libs
import Link from 'next/link';
import { Heading, Text, Flex, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

export default function NotFound() {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
      mt={230}
    >
      <Heading>Not Found</Heading>
      <Text>Could not find requested resource</Text>
      <Link
        href={ROUTES.DASHBOARD}
        style={{ textDecoration: 'underline', textAlign: 'center' }}
      >
        <Button colorScheme="brand">Return Home</Button>
      </Link>
    </Flex>
  );
}
