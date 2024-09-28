import type { Metadata } from 'next';
import NextLink from 'next/link';

import * as React from 'react';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Button, Unstable_Grid2 as Grid, Stack } from '@mui/material';

import { TeamCard } from '@/components/dashboard/teams/team-card';
import { ListHeader, ListNoData } from '@/components/ui/list';
import { config } from '@/config';
import { paths } from '@/paths';

import { teams } from './data';

export const metadata = { title: `Список команд | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const isEmptyList = teams.length === 0;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <ListHeader text="Команды" />
        <Button
          component={NextLink}
          href={paths.dashboard.teams.new}
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
        >
          {isEmptyList ? 'Создать' : 'Добавить'}
        </Button>
      </Stack>
      {isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {teams.map((item) => (
          <Grid key={item.id} md={4} xs={12} display="grid">
            <TeamCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
