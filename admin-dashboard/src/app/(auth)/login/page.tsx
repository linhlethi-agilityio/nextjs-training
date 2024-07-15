import { Metadata } from 'next';
import Link from 'next/link';
import { Text, Heading, Stack, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { LoginForm } from '@/components';

export const metadata: Metadata = {
  title: 'Welcome',
};

const LoginPage = () => {
  return (
    <Stack
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Heading>Login</Heading>
      <LoginForm />
      <Text>
        Don’t have an account?&nbsp;
        <Link href={ROUTES.REGISTER} as="button">
          <Button px={0} variant="icon" color="blue.500">
            Sign Up
          </Button>
        </Link>
      </Text>
    </Stack>
  );
};

export default LoginPage;
