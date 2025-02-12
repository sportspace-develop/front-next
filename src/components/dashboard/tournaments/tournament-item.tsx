import NextLink from 'next/link';

import * as React from 'react';

import { parseISO } from 'date-fns';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

import formatDate from '@/lib/format-date';
import { paths } from '@/paths';

import { Tournament } from './types';

interface TournamentProps {
  item: Tournament;
}

const FORMAT_DATE = 'd MMMM yyyy';

const DateTimePeriod = React.memo(
  ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
    return (
      <Typography color="text.secondary" variant="caption">
        {startDate && formatDate(parseISO(startDate), { format: FORMAT_DATE })}
        {startDate && endDate && ' - '}
        {endDate && formatDate(parseISO(endDate), { format: FORMAT_DATE })}
      </Typography>
    );
  },
);

const TournamentItem = React.memo(({ item }: TournamentProps): React.JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea
        component={NextLink}
        href={`${paths.dashboard.tournaments.index}/${item.id}/edit`}
      >
        <CardMedia
          sx={{ height: { xs: 100, sm: 200 }, display: 'flex', backgroundSize: 'contain' }}
          image={item.logoUrl}
          title={item.title}
        >
          {!item.logoUrl && (
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
          <Typography variant="h3" sx={{ wordWrap: 'break-word' }}>
            {item.title}
          </Typography>
          {item.description && (
            <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
              {item.description}
            </Typography>
          )}
          {item.organization && (
            <Stack>
              <Typography color="text.secondary" variant="subtitle2">
                Организатор:
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                {item.organization}
              </Typography>
            </Stack>
          )}
          <Stack>
            <Typography color="text.secondary" variant="subtitle2">
              Продолжительность:
            </Typography>
            <DateTimePeriod startDate={item.startDate} endDate={item.endDate} />
            {(item.registerStartDate || item.registerEndDate) && (
              <>
                <Typography color="text.secondary" variant="subtitle2">
                  Регистрация:
                </Typography>
                <DateTimePeriod startDate={item.registerStartDate} endDate={item.registerEndDate} />
              </>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default TournamentItem;
