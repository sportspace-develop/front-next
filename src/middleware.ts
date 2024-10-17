import type { NextRequest } from 'next/server';

import { paths } from '@/paths';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL(paths.dashboard.teams.index, request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL(paths.auth.signIn, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.ico|.*\\.svg|.*\\.png|.*\\.jpeg|.*\\.jpg).*)'],
};
