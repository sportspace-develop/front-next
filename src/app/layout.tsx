import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import * as React from 'react';

import StoreProvider from '@/app/StoreProvider';
import {ThemeProvider} from '@/components/core/theme-provider/theme-provider';
import {UserProvider} from '@/contexts/user-context';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'SportSpace',
  description: 'Sport space',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="ru">
        <body className={inter.className}>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
