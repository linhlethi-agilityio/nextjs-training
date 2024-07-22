import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { api } from './services';

// Constants
import { API_ENDPOINT } from './constants';

// Models
import { User } from '@/models';

export const CredentialsProvider = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    const parsedCredentials = z
      .object({ email: z.string().email(), password: z.string().min(6) })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { email, password } = parsedCredentials.data;

      const { data: users } = await api.getData<User[]>(API_ENDPOINT.USERS);
      const user = users.find((user) => user.email === email);

      if (!user) return null;

      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (passwordsMatch) return user;
    }

    return null;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
