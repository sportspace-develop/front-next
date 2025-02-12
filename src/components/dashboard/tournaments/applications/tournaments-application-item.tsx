import NextLink from 'next/link';

import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';

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
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Box display="flex">
              <Typography variant="subtitle1" color="text.secondary">
                Команда:
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  maxWidth: { xs: '200px', sm: '150px', md: '200px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ml: 1,
                }}
                title={item.teamTitle}
              >
                {item.teamTitle}
              </Typography>
            </Box>
            <Avatar
              title={item.teamTitle}
              src={item.teamLogoUrl}
              sx={{
                height: { xs: 30, sm: 40 },
                width: { xs: 30, sm: 40 },
                ml: 1,
              }}
            />
          </Stack>
          <Box display="flex">
            <Typography variant="subtitle1" color="text.secondary">
              Статус:
            </Typography>
            <Typography variant="subtitle1" sx={{ wordWrap: 'break-word', ml: 1 }}>
              {getLocalizedStatus(item.status)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TournamentsApplicationItem;
