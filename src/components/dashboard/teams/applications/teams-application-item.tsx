import NextLink from 'next/link';

import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';

import getLocalizedStatus from '@/lib/get-localized-status';
import { paths } from '@/paths';

import { TeamApplication } from '../types';

interface TeamsApplicationItemProps {
  item: TeamApplication;
  teamId: string;
}

const TeamsApplicationItem = ({ item, teamId }: TeamsApplicationItemProps) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea
        component={NextLink}
        href={`${paths.dashboard.teams.index}/${teamId}/applications/${item.id}/edit`}
      >
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Box display="flex">
                <Typography variant="subtitle1" color="text.secondary">
                  Турнир:
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
                  title={item.tournamentTitle}
                >
                  {item.tournamentTitle}
                </Typography>
              </Box>
              <Avatar
                title={item.tournamentTitle}
                src={item.tournamentLogoUrl}
                sx={{
                  height: { xs: 30, sm: 40 },
                  width: { xs: 30, sm: 40 },
                  ml: 2,
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
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TeamsApplicationItem;
