import * as React from 'react';

import {Card, CardActionArea, CardContent, CardMedia, Stack, Typography} from '@mui/material';

export type Tournament = {
  id: number;
  name: string;
  organisation: string;
  description: string;
  logo: string;
};

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({tournament}): React.JSX.Element => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack spacing={4} sx={{alignItems: 'center'}}>
            <CardMedia
              sx={{height: 172, width: 172}}
              image={tournament.logo}
              title={tournament.name}
            />
          </Stack>
          <Stack spacing={1} sx={{textAlign: 'center'}}>
            <Typography variant="h5">{tournament.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {tournament.organisation}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {tournament.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
