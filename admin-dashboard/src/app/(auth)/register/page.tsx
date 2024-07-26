import { Metadata } from 'next';
import Link from 'next/link';
import { register } from '@/actions/auth';
import { Text, Heading, Button } from '@chakra-ui/react';

// Constants
import { ROUTES } from '@/constants';

// Components
import { RegisterForm } from '@/components';

export const metadata: Metadata = {
  title: 'Welcome',
};

const RegisterPage = () => {
  return (
    <>
      <Heading>Register</Heading>
      <RegisterForm onSubmit={register} />
      <Text>
        Already have an account?&nbsp;
        <Link href={ROUTES.LOGIN}>
          <Button px={0} variant="icon" color="blue.700">
            Login
          </Button>
        </Link>
      </Text>
    </>
  );
};

export default RegisterPage;
