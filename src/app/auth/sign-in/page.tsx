import type {Metadata} from 'next';

import * as React from 'react';

import {Layout} from '@/components/auth/layout';
import {SignInForm} from '@/components/auth/sign-in-form';
import {config} from '@/config';

export const metadata = {title: `Sign in | Auth | ${config.site.name}`} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <SignInForm />
    </Layout>
  );
}
