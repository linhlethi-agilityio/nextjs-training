import { Metadata } from 'next';
import Link from 'next/link';
import { authenticate } from '@/actions/auth';
import { Text, Heading, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { LoginForm } from '@/components';

export const metadata: Metadata = {
  title: 'Welcome',
};

const LoginPage = () => {
  return (
    <>
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
    </>
  );
};

export default LoginPage;
