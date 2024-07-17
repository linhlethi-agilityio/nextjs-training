import { Metadata } from 'next';
import Link from 'next/link';
import { Text, Heading, Stack, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { LoginForm } from '@/components';
import { authenticate } from '@/actions/auth';

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
      bgColor="backgroundDashboard"
    >
      <Heading>Login</Heading>
      <LoginForm onSubmit={authenticate} />
      <Text>
        Don’t have an account?&nbsp;
        <Link href={ROUTES.REGISTER}>
          <Button px={0} variant="icon" color="blue.500">
            Register
          </Button>
        </Link>
      </Text>
    </Stack>
  );
};

export default LoginPage;
