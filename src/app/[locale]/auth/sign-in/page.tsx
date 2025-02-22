import type { Metadata } from 'next';

import * as React from 'react';

import { SignInForm } from '@/components/auth/sign-in-form';
import { config } from '@/config';

export const metadata = { title: `Войти | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <SignInForm />;
}
