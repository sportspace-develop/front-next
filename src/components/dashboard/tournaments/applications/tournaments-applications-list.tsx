'use client';

import * as React from 'react';

import { Avatar, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';

import DateTimePeriod from '@/components/ui/date-time-period';
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
      {tournament && (
        <Stack sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="flex-end">
            <Typography color="text.secondary" variant="subtitle1" sx={{ mr: 1 }}>
              Регистрация на турнира:
            </Typography>
            <DateTimePeriod
              startDate={tournament.registerStartDate}
              endDate={tournament.registerEndDate}
            />
          </Stack>
          <Stack direction="row" alignItems="flex-end">
            <Typography color="text.secondary" variant="subtitle1" sx={{ mr: 1 }}>
              Продолжительность турнира:
            </Typography>
            <DateTimePeriod startDate={tournament.startDate} endDate={tournament.endDate} />
          </Stack>
        </Stack>
      )}
      {isLoading && <SkeletonList />}
      {!isLoading && isEmptyList && <ListNoData isHiddenCreateText />}
      <Grid container spacing={3}>
        {applications?.data?.map((item) => (
          <Grid key={item.id} md={6} xs={12} display="grid">
            <TournamentApplicationItem item={item} tournamentId={tournamentId} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TournamentApplicationList;
