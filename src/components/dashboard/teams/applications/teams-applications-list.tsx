'use client';

import NextLink from 'next/link';

import * as React from 'react';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Avatar, Button, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { ListNoData, SkeletonList } from '@/components/ui/list';
import addQuotes from '@/lib/add-quotes';
import { useGetTeamByIdQuery, useGetTeamsApplicationsQuery } from '@/lib/store/features/teams-api';
import { paths } from '@/paths';

import TeamsApplicationItem from './teams-application-item';

interface TeamsApplicationListProps {
  teamId: string;
}

const TeamsApplicationsList = ({ teamId }: TeamsApplicationListProps) => {
  const { data: applications, isLoading: isGetApplicationLoading } =
    useGetTeamsApplicationsQuery(teamId);

  const { data: team, isLoading: isGetTeamLoading } = useGetTeamByIdQuery(teamId);

  const isEmptyList = React.useMemo(() => applications?.data?.length === 0, [applications]);

  const isLoading = isGetTeamLoading || isGetApplicationLoading;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Typography variant="h2">Заявки команды {addQuotes(team?.title)}</Typography>
        {team && (
          <Avatar
            src={team.logoUrl}
            title={team.title}
            sx={{
              width: 35,
              height: 35,
              boxShadow: 3,
              display: { xs: 'none', md: 'inherit' },
            }}
          />
        )}
        <Button
          component={NextLink}
          href={`${paths.dashboard.teams.index}/${teamId}/applications/new`}
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          disabled={isLoading}
          sx={{ ml: 'auto', height: 'max-content' }}
        >
          {isEmptyList ? 'Создать' : 'Добавить'}
        </Button>
      </Stack>
      {isLoading && <SkeletonList />}
      {!isLoading && isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {applications?.data?.map((item) => (
          <Grid key={item.id} md={4} sm={6} xs={12} display="grid">
            <TeamsApplicationItem item={item} teamId={teamId} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TeamsApplicationsList;
