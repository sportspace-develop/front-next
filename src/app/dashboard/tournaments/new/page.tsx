import { Metadata } from 'next';

import * as React from 'react';

import { Stack } from '@mui/material';

import TournamentEditForm from '@/components/dashboard/tournaments/edit/tournament-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Создать турнир | ${config.site.name}` } satisfies Metadata;

const title = 'Создание турнира';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={2}>
      <BackToLink text="Вернуться к списку турниров" href={paths.dashboard.tournaments.index} />
      <TournamentEditForm title={title} />
    </Stack>
  );
}
