import { Metadata } from 'next';

import * as React from 'react';

import Tournaments from '@/components/dashboard/tournaments/tournaments-list';
import { config } from '@/config';

export const metadata = { title: `Список турниров | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <Tournaments />;
}
