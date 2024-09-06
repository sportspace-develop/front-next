import * as React from 'react';
import {Avatar, Unstable_Grid2 as Grid, Card, CardContent, CardMedia, CardActionArea, Typography} from '@mui/material';
import formatDate from '@/lib/format-date';

export type Team = {
  id: string;
  name: string;
  logo?: string;
  picture?: string;
  createdAt: Date;
};

interface TeamCardProps {
  team: Team;
}

export const TeamCard = ({team}: TeamCardProps): React.JSX.Element => {
  return (
    <Card sx={{display: 'flex'}}>
      <CardActionArea>
        <CardMedia
          sx={{height: 200, display: 'flex'}}
          image={team.picture}
          title={team.name}
        >
          {!team.picture && <Avatar sx={{height: 180, width: 180, m: 'auto'}} />} </CardMedia>
        <CardContent>
          <Grid container spacing={1} sx={{alignItems: "center", justifyContent: "space-between"}}>
            <Grid md={4} xs={12}>
              <Avatar src={team.logo} title={team.name} sx={{width: {lg: 70, md: 50, xs: 100}, height: {lg: 70, md: 50, xs: 100}, boxShadow: 3}} />
            </Grid>
            <Grid md={8} xs={12} spacing={1} sx={{flexBasis: 'content'}}>
              <Typography variant="h6" sx={{wordWrap: 'break-word'}}>{team.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                {formatDate(team.createdAt, {format: 'd MMMM yyyy'})}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
