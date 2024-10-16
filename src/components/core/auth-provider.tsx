'use client';

import { usePathname, useRouter } from 'next/navigation';

import * as React from 'react';

import { useAppSelector } from '@/lib/store/hooks';
import { paths } from '@/paths';

function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isAuthenticated && !pathname.startsWith('/auth')) {
      router.push(paths.auth.signIn);
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}

export default AuthProvider;
