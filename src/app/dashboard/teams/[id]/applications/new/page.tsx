import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TeamsApplicationEditForm from '@/components/dashboard/teams/applications/teams-applications-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Список заявок команды | ${config.site.name}` } satisfies Metadata;
interface Params {
  id: number;
}

const title = 'Создание заявки';

const Page: NextPage<{ params: Params }> = ({ params }) => {
  return (
    <Stack spacing={2}>
      <BackToLink text="Вернуться к списку команд" href={paths.dashboard.teams.index} />
      <TeamsApplicationEditForm teamId={params.id} title={title} />
    </Stack>
  );
};

export default Page;
