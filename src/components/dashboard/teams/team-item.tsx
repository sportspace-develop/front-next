import NextLink from 'next/link';

import * as React from 'react';

import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';

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
          sx={{ height: 200, display: 'flex', backgroundSize: 'contain' }}
          image={item.photo_url}
          title={item.title}
        >
          {!item.photo_url && <Avatar sx={{ height: 180, width: 180, m: 'auto' }} />}
        </CardMedia>
        <CardContent>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid md={4} xs={12}>
              <Avatar
                src={item.logo_url}
                title={item.title}
                sx={{
                  width: { lg: 70, md: 50, xs: 100 },
                  height: { lg: 70, md: 50, xs: 100 },
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid md={8} xs={12} spacing={1} sx={{ flexBasis: 'content' }}>
              <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                {item.title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default TeamItem;
