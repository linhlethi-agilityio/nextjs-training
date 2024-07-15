import { Metadata } from 'next';
import Link from 'next/link';
import { Text, Heading, Stack, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { RegisterForm } from '@/components';

export const metadata: Metadata = {
  title: 'Welcome',
};

const RegisterPage = () => {
  return (
    <Stack
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bgColor="backgroundDashboard"
    >
      <Heading>Register</Heading>
      <RegisterForm />
      <Text>
        Already have an account?&nbsp;
        <Link href={ROUTES.LOGIN}>
          <Button px={0} variant="icon" color="blue.500">
            Login
          </Button>
        </Link>
      </Text>
    </Stack>
  );
};

export default RegisterPage;
