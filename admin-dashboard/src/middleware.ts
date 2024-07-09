// middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LIMIT, LIMIT_PAGE } from './constants';

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const limit = request.nextUrl.searchParams.get('limit') ?? DEFAULT_LIMIT;
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
