// middleware.js
import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import type { NextRequest } from 'next/server';
import { authConfig } from './auth.config';

const LIMIT_PAGE = [10, 20, 50];

const { auth } = NextAuth(authConfig);

const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const limit = request.nextUrl.searchParams.get('limit') ?? 10;
  const page = request.nextUrl.searchParams.get('page') ?? 1;

  const isValidLimit = LIMIT_PAGE.includes(Number(limit));
  const isValidPage = !(isNaN(Number(page)) || Number(page) < 1);

  // Validate 'limit' parameter
  if (!isValidLimit || !isValidPage) {
    url.searchParams.delete('limit');
    url.searchParams.delete('page');

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export default auth(middleware);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
