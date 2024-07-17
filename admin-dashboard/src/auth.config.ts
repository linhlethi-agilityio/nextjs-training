import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith('/');

      if (isOnDashboard) {
        if (isLoggedIn) return true;

        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  session: {
    //strategy: 'jwt', // jwt for default or 'database adapter'
    maxAge: 60 * 60 * 24, // 1 day, default 30 days
  },
  trustHost: true,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
