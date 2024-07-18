'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

// Services
import { api } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Models
import { UserLogin } from '@/models';

interface UserInput {
  email: string;
  name: string;
  password: string;
  role: string;
}

export const authenticate = async (formData: UserLogin) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email or password invalid.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};

export const register = async (newUser: UserInput) => {
  try {
    const { email, password } = newUser;

    const { data: users } = await api.getData<UserLogin[]>(API_ENDPOINT.USERS);

    const isUser = users.some((user) => user.email === email);

    if (isUser) {
      return 'Email already exists. Please try again!';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    api.postData(API_ENDPOINT.USERS, {
      ...newUser,
      password: hashedPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
};

export const logout = async () => {
  await signOut();
};
