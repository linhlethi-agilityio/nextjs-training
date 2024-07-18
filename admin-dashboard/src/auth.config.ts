import type { NextAuthConfig } from 'next-auth';
import { ROUTES } from './constants';

export const authConfig = {
  pages: {
    signIn: ROUTES.LOGIN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname === ROUTES.LOGIN;
      const isOnRegisterPage = nextUrl.pathname === ROUTES.REGISTER;

      // If not logged in and not on login or register page, redirect to login page
      if (!isLoggedIn && !isOnLoginPage && !isOnRegisterPage) {
        return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
      }

      // If logged in and on login or register page, redirect to product page
      if (isLoggedIn && (isOnLoginPage || isOnRegisterPage)) {
        return Response.redirect(new URL(ROUTES.PRODUCT, nextUrl));
      }

      // Allow access in all other cases
      return true;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  providers: [],
} satisfies NextAuthConfig;
