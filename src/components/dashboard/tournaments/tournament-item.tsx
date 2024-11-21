import NextLink from 'next/link';

import * as React from 'react';

import { parseISO } from 'date-fns';

import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import formatDate from '@/lib/format-date';
import { paths } from '@/paths';

import { Tournament } from './types';

interface TournamentProps {
  item: Tournament;
}

const getRenderDate = (date?: string) =>
  date ? formatDate(parseISO(date), { format: 'd MMMM yyyy' }) : null;

const TournamentItem = React.memo(({ item }: TournamentProps): React.JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea component={NextLink} href={paths.dashboard.tournaments}>
        <CardMedia
          sx={{ height: { xs: 100, sm: 200 }, display: 'flex', backgroundSize: 'contain' }}
          image={item.logoUrl}
          title={item.title}
        />
        <CardContent>
          <Typography variant="h3" sx={{ wordWrap: 'break-word' }}>
            {item.title}
          </Typography>
          {/* TODO: добавить на бек description и organisation
					<Typography color="text.secondary" variant="body2">
            {item.organisation}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {item.description}
          </Typography> */}
          <Stack>
            <Typography color="text.secondary" variant="subtitle2">
              Продолжительность:
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {getRenderDate(item.startDate)}
              {item.startDate && item.endDate && ' - '}
              {getRenderDate(item.endDate)}
            </Typography>

            <Typography color="text.secondary" variant="subtitle2">
              Регистрация:
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {getRenderDate(item.registerStartDate)}
              {item.registerStartDate && item.registerEndDate && ' - '}
              {getRenderDate(item.registerEndDate)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default TournamentItem;
