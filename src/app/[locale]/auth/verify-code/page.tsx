import type { Metadata } from 'next';

import * as React from 'react';

import { CircularProgress } from '@mui/material';

import VerifyCodeForm from '@/components/auth/verify-code-form';
import { config } from '@/config';

export const metadata = { title: `Ввести код | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <VerifyCodeForm />
    </React.Suspense>
  );
}
