import { Metadata } from 'next';

import * as React from 'react';

import TeamsList from '@/components/dashboard/teams/teams-list';
import { config } from '@/config';

export const metadata = { title: `Список команд | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <TeamsList />;
}
