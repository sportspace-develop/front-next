'use client';

import * as React from 'react';

import { Avatar, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import { ListNoData, SkeletonList } from '@/components/ui/list';
import addQuotes from '@/lib/add-quotes';
import {
  useGetTournamentByIdQuery,
  useGetTournamentsApplicationsQuery,
} from '@/lib/store/features/tournaments-api';

import TournamentApplicationItem from './tournaments-application-item';

interface TournamentApplicationListProps {
  tournamentId: string;
}

const TournamentApplicationList = ({ tournamentId }: TournamentApplicationListProps) => {
  const { data: applications, isLoading: isGetApplicationLoading } =
    useGetTournamentsApplicationsQuery(tournamentId);

  const { data: tournament, isLoading: isGetTeamLoading } = useGetTournamentByIdQuery(tournamentId);

  const isEmptyList = React.useMemo(() => applications?.data?.length === 0, [applications]);

  const isLoading = isGetTeamLoading || isGetApplicationLoading;

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Typography variant="h2">Заявки на турнир {addQuotes(tournament?.title)}</Typography>
        {tournament && (
          <Avatar
            src={tournament.logoUrl}
            title={tournament.title}
            sx={{
              width: 35,
              height: 35,
              boxShadow: 3,
              display: { xs: 'none', md: 'inherit' },
            }}
          />
        )}
      </Stack>
      {isLoading && <SkeletonList />}
      {!isLoading && isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {applications?.data?.map((item) => (
          <Grid key={item.id} md={4} sm={6} xs={12} display="grid">
            <TournamentApplicationItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TournamentApplicationList;
