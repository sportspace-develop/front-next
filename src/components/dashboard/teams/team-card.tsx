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

import formatDate from '@/lib/format-date';
import { paths } from '@/paths';

export type Team = {
  id: string;
  name: string;
  logo?: string;
  picture?: string;
  createdAt: Date;
};

interface TeamCardProps {
  item: Team;
}

export const TeamCard = ({ item }: TeamCardProps): React.JSX.Element => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea component={NextLink} href={`${paths.dashboard.teams}/${item.id}/edit`}>
        <CardMedia sx={{ height: 200, display: 'flex' }} image={item.picture} title={item.name}>
          {!item.picture && <Avatar sx={{ height: 180, width: 180, m: 'auto' }} />}
        </CardMedia>
        <CardContent>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid md={4} xs={12}>
              <Avatar
                src={item.logo}
                title={item.name}
                sx={{
                  width: { lg: 70, md: 50, xs: 100 },
                  height: { lg: 70, md: 50, xs: 100 },
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid md={8} xs={12} spacing={1} sx={{ flexBasis: 'content' }}>
              <Typography variant="h6" sx={{ wordWrap: 'break-word' }}>
                {item.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {formatDate(item.createdAt, { format: 'd MMMM yyyy' })}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
