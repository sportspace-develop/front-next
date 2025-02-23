import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TeamsApplicationsList from '@/components/dashboard/teams/applications/teams-applications-list';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Список заявок | ${config.site.name}` } satisfies Metadata;

interface Params {
  id: string;
}

const Page: NextPage<{ params: Params }> = ({ params: { id: teamId } }) => {
  return (
    <Stack spacing={2}>
      <BackToLink
        text="Вернуться к команде"
        href={`${paths.dashboard.teams.index}/${teamId}/edit`}
      />
      <TeamsApplicationsList teamId={teamId} />
    </Stack>
  );
};

export default Page;
