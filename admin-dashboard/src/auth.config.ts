import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname === '/login';
      const isOnRegisterPage = nextUrl.pathname === '/register';

      // If not logged in and not on login or register page, redirect to login page
      if (!isLoggedIn && !isOnLoginPage && !isOnRegisterPage) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      // If logged in and on login or register page, redirect to product page
      if (isLoggedIn && (isOnLoginPage || isOnRegisterPage)) {
        return Response.redirect(new URL('/product', nextUrl));
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
