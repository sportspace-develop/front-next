import { Metadata } from 'next';

import * as React from 'react';

import { Stack } from '@mui/material';

import TeamEditForm from '@/components/dashboard/teams/edit/team-edit-form';
import BreadcrumbsNav from '@/components/ui/breadcrumbs-nav';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Редактировать команду | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const title = 'Редактирование команды';

  return (
    <Stack spacing={2}>
      <BreadcrumbsNav
        currentTitle={title}
        items={[
          { name: 'Обзор', path: paths.dashboard.overview },
          { name: 'Список команд', path: paths.dashboard.teams },
        ]}
      />
      <TeamEditForm title={title} />
    </Stack>
  );
}
