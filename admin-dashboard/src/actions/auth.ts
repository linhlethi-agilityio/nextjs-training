'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';

// Services
import { api } from '@/services';

// Constants
import { API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

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
    const data = { ...formData, role: 'user' };

    await signIn('credentials', data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return ERROR_MESSAGES.EMAIL_PASSWORD_INVALID;
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
      return ERROR_MESSAGES.EMAIL_EXISTS;
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
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};

export const logout = async () => {
  await signOut();
};
