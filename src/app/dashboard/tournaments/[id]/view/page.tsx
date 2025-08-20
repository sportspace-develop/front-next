import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TournamentViewForm from '@/components/dashboard/tournaments/view/tournament-view-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Просмотр турнира | ${config.site.name}` } satisfies Metadata;

const title = 'Просмотр турнира';

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
      </Stack>
      <TournamentViewForm title={title} id={params.id} />
    </Stack>
  );
};

export default Page;
