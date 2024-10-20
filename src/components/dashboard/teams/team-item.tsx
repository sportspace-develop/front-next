import NextLink from 'next/link';

import * as React from 'react';

import { parseISO } from 'date-fns';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';

import formatDate from '@/lib/format-date';
import { paths } from '@/paths';

import { Team } from './types';

interface TeamCardProps {
  item: Team;
}

const TeamItem = React.memo(({ item }: TeamCardProps): React.JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea component={NextLink} href={`${paths.dashboard.teams.index}/${item.id}/edit`}>
        <CardMedia
          sx={{ height: { xs: 100, sm: 200 }, display: 'flex', backgroundSize: 'contain' }}
          image={item.photoUrl}
          title={item.title}
        >
          {!item.photoUrl && (
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
          <Grid
            container
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid md={4} xs={12}>
              <Avatar
                src={item.logoUrl}
                title={item.title}
                sx={{
                  width: { lg: 70, md: 50, xs: 80 },
                  height: { lg: 70, md: 50, xs: 80 },
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid md={8} xs={12} spacing={1} sx={{ flexBasis: 'content' }}>
              <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                {item.title}
              </Typography>
              {item.createdAt && (
                <Typography color="text.secondary" variant="body2">
                  {formatDate(parseISO(item.createdAt), { format: 'd MMMM yyyy' })}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default TeamItem;
