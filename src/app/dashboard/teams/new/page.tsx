import { Metadata } from 'next';

import * as React from 'react';

import { Stack } from '@mui/material';

import BackToTeamsLink from '@/components/dashboard/teams/edit/back-to-teams-link';
import TeamEditForm from '@/components/dashboard/teams/edit/team-edit-form';
import { config } from '@/config';

export const metadata = { title: `Создать команду | ${config.site.name}` } satisfies Metadata;

const title = 'Создание команды';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <BackToTeamsLink />
      <TeamEditForm title={title} />
    </Stack>
  );
}
