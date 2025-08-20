import NextLink from 'next/link';

import * as React from 'react';

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

import DateTimePeriod from '@/components/ui/date-time-period';
import { paths } from '@/paths';

import { Tournament } from './types';

interface TournamentProps {
  item: Tournament;
  isOwner: boolean;
}

const TournamentItem = React.memo(({ item, isOwner }: TournamentProps): React.JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea
        component={NextLink}
        href={`${paths.dashboard.tournaments.index}/${item.id}/${isOwner ? 'edit' : 'view'}`}
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
          {isOwner && (
            <Button component="div" variant="outlined" sx={{ padding: '0 5px' }}>
              Ваш турнир
            </Button>
          )}
          <Typography variant="h3" sx={{ wordWrap: 'break-word' }}>
            {item.title}
          </Typography>
          {item.description && (
            <Typography variant="body2" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
              {item.description}
            </Typography>
          )}
          <Stack>
            <Typography color="text.secondary" variant="subtitle2">
              Регистрация:
            </Typography>
            <DateTimePeriod
              startDate={item.registerStartDate}
              endDate={item.registerEndDate}
              variant="caption"
            />
            <Typography color="text.secondary" variant="subtitle2">
              Продолжительность:
            </Typography>
            <DateTimePeriod startDate={item.startDate} endDate={item.endDate} variant="caption" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default TournamentItem;
