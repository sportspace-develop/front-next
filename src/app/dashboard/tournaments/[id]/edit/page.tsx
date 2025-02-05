import { Metadata, NextPage } from 'next';
import NextLink from 'next/link';

import { Link, Stack, Typography } from '@mui/material';

import TournamentEditForm from '@/components/dashboard/tournaments/edit/tournament-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Редактировать турнир | ${config.site.name}` } satisfies Metadata;

const title = 'Редактирование турнира';

interface Params {
  id: string;
}

const Page: NextPage<{ params: Params }> = ({ params }) => {
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <BackToLink text="Вернуться к списку турниров" href={paths.dashboard.tournaments.index} />
        <Link
          component={NextLink}
          href={`${paths.dashboard.teams.index}/${params.id}/applications`}
        >
          <Typography variant="subtitle2">К списку заявок на турнир</Typography>
        </Link>
      </Stack>
      <TournamentEditForm title={title} id={params.id} />
    </Stack>
  );
};

export default Page;
