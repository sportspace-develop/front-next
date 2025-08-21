'use client';

import * as React from 'react';

import { skipToken } from '@reduxjs/toolkit/query';

import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import DateTimePeriod from '@/components/ui/date-time-period';
import { SkeletonList } from '@/components/ui/list';
import { useGetTournamentByIdQuery } from '@/lib/store/features/tournaments-api';

type TournamentEditFormProps = {
  id?: string;
  title: string;
};

const TournamentViewForm = React.memo(({ id }: TournamentEditFormProps) => {
  const { data: tournament, isLoading: isGetTournamentLoading } = useGetTournamentByIdQuery(
    id ?? skipToken,
  );

  if (isGetTournamentLoading) {
    return <SkeletonList />;
  }

  if (!tournament) {
    return <div>Турнир не найден</div>;
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        sx={{
          width: '100%',
          height: { xs: 100, sm: 200 },
          display: 'flex',
          backgroundSize: 'contain',
          margin: 'auto',
        }}
        image={tournament.logoUrl}
        title={tournament.title}
      >
        {!tournament.logoUrl && (
          <Avatar
            sx={{
              height: { xs: 80, sm: 180 },
              width: { xs: 80, sm: 180 },
              m: 'auto',
            }}
          />
        )}
      </CardMedia>
      <CardContent>
        <Typography variant="h3" sx={{ wordWrap: 'break-word', marginBottom: '4px' }}>
          {tournament.title}
        </Typography>
        {tournament.description && (
          <Stack>
            <Typography color="text.secondary" variant="subtitle2">
              Описание:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
              {tournament.description}
            </Typography>
          </Stack>
        )}
        <Stack>
          <Typography color="text.secondary" variant="subtitle2">
            Регистрация:
          </Typography>
          <DateTimePeriod
            startDate={tournament.registerStartDate}
            endDate={tournament.registerEndDate}
            variant="caption"
          />
          <Typography color="text.secondary" variant="subtitle2">
            Продолжительность:
          </Typography>
          <DateTimePeriod
            startDate={tournament.startDate}
            endDate={tournament.endDate}
            variant="caption"
          />
        </Stack>
      </CardContent>
    </Card>
  );
});

export default TournamentViewForm;
