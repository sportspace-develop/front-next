import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import StoreProvider from '@/app/store-provider';
import DatePickerProvider from '@/components/core/date-picker-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import ScrollUpButton from '@/components/ui/scroll-up-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportSpace',
  description: 'Sport space',
  icons: {
    icon: [
      {
        url: '/favicon/favicon.ico',
      },
      {
        url: '/favicon/favicon-32x32.ico',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-16x16.ico',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: '/favicon/apple-touch-icon.png',
    shortcut: '/favicon/apple-touch-icon.png',
  },
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
          <ThemeProvider>
            <ToastContainer autoClose={2000} />
            <DatePickerProvider>{children}</DatePickerProvider>
          </ThemeProvider>
          <ScrollUpButton />
        </body>
      </html>
    </StoreProvider>
  );
}
