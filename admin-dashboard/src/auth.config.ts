import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith('/product');

      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/product', nextUrl));
      }
      return true;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  providers: [],
} satisfies NextAuthConfig;
