import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TeamsApplicationEditForm from '@/components/dashboard/teams/applications/teams-applications-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Редактировать заявку | ${config.site.name}` } satisfies Metadata;
interface Params {
  id: number;
  applicationId: number;
}

const title = 'Редактирование заявки';

const Page: NextPage<{ params: Params }> = ({ params }) => {
  return (
    <Stack spacing={2}>
      <BackToLink
        text="Вернуться к списку заявок"
        href={`${paths.dashboard.teams.index}/${params.id}/applications`}
      />
      <TeamsApplicationEditForm
        teamId={params.id}
        applicationId={params.applicationId}
        title={title}
      />
    </Stack>
  );
};

export default Page;
