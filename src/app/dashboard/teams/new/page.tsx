import { Metadata } from 'next';

import * as React from 'react';

import { Stack } from '@mui/material';

import TeamEditForm from '@/components/dashboard/teams/edit/team-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Создать команду | ${config.site.name}` } satisfies Metadata;

const title = 'Создание команды';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <BackToLink text="Вернуться к списку команд" href={paths.dashboard.teams.index} />
      <TeamEditForm title={title} />
    </Stack>
  );
}
