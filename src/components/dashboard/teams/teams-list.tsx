'use client';

import NextLink from 'next/link';

import * as React from 'react';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Button, Unstable_Grid2 as Grid, Stack } from '@mui/material';

import { ListHeader, ListNoData, SkeletonList } from '@/components/ui/list';
import { useGetTeamsQuery } from '@/lib/store/features/teams-api';
import { paths } from '@/paths';

import TeamItem from './team-item';

const TeamsList = React.memo((): React.JSX.Element => {
  const { isLoading, data: teams } = useGetTeamsQuery();

  const isEmptyList = React.useMemo(() => teams?.length === 0, [teams]);

  console.log(isLoading, teams);

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
      {isLoading && <SkeletonList />}
      {isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {teams?.map((item) => (
          <Grid key={item.id} md={4} xs={12} display="grid">
            <TeamItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
});

export default TeamsList;
