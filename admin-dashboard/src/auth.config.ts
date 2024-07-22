import type {
  NextAuthConfig,
  Session as NextAuthSession,
  User as NextAuthUser,
} from 'next-auth';

export interface CustomUser extends NextAuthUser {
  id: string;
  role: string;
}

export interface CustomSession extends NextAuthSession {
  user: CustomUser;
  accessToken: string;
}

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
    session({ session, token }) {
      const sessionInfo = {
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
        },
        expires: session.expires,
        accessToken: token.token,
      };

      return sessionInfo as CustomSession;
    },
    jwt({ token, user }) {
      if (user) return { ...token, ...user };

      return token;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  providers: [],
} satisfies NextAuthConfig;
