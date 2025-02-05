import NextLink from 'next/link';

import {
  Card,
  CardActionArea,
  CardContent,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';

import getLocalizedStatus from '@/lib/get-localized-status';
import { paths } from '@/paths';

import { TournamentApplication } from '../types';

interface TournamentsApplicationItemProps {
  item: TournamentApplication;
  tournamentId: number | string;
}

const TournamentsApplicationItem = ({ item, tournamentId }: TournamentsApplicationItemProps) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea
        component={NextLink}
        href={`${paths.dashboard.tournaments.index}/${tournamentId}/applications/${item.id}/edit`}
      >
        <CardContent>
          <Grid
            container
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid md={8} xs={12} spacing={1} sx={{ flexBasis: 'content' }}>
              <Typography variant="h4" sx={{ wordWrap: 'break-word' }}>
                {item.teamTitle || 'Название команды'}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ wordWrap: 'break-word' }}
                color="text.secondary"
              >
                Статус: {getLocalizedStatus(item.status)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TournamentsApplicationItem;
