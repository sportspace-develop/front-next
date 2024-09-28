import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import BackToTeamsLink from '@/components/dashboard/teams/edit/back-to-teams-link';
import TeamEditForm from '@/components/dashboard/teams/edit/team-edit-form';
import { config } from '@/config';

export const metadata = { title: `Редактировать команду | ${config.site.name}` } satisfies Metadata;

const title = 'Редактирование команды';

interface Params {
  id: string;
}

const Page: NextPage<{ params: Params }> = ({ params }) => {
  const { id } = params;

  return (
    <Stack spacing={2}>
      <BackToTeamsLink />
      <TeamEditForm title={title} id={id} />
    </Stack>
  );
};

export default Page;
