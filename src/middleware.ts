import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const currentUser = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  if (currentUser && !pathname.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!currentUser && !pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.(?:svg|png|jpg|jpeg)).*)',
  ],
};
