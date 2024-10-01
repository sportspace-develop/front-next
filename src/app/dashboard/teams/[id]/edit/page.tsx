import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TeamEditForm from '@/components/dashboard/teams/edit/team-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Редактировать команду | ${config.site.name}` } satisfies Metadata;

const title = 'Редактирование команды';

interface Params {
  id: string;
}

const Page: NextPage<{ params: Params }> = ({ params }) => {
  const { id } = params;

  return (
    <Stack spacing={2}>
      <BackToLink text="Вернуться к списку команд" href={paths.dashboard.teams.index} />
      <TeamEditForm title={title} id={id} />
    </Stack>
  );
};

export default Page;
