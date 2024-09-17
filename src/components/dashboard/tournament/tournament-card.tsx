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
  item: Tournament;
}

export const TournamentCard = ({item}: TournamentCardProps): React.JSX.Element => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack spacing={4} sx={{alignItems: 'center'}}>
            <CardMedia sx={{height: 172, width: 172}} image={item.logo} title={item.name} />
          </Stack>
          <Stack spacing={1} sx={{textAlign: 'center'}}>
            <Typography variant="h5">{item.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {item.organisation}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {item.description}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
