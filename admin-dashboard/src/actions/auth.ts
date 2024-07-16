'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const authenticate = async (formData: FormData) => {
  try {
    console.log(formData);
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};
