import { Metadata, NextPage } from 'next';

import { Stack } from '@mui/material';

import TournamentsApplicationEditForm from '@/components/dashboard/tournaments/applications/tournaments-applications-edit-form';
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
        href={`${paths.dashboard.tournaments.index}/${params.id}/applications`}
      />
      <TournamentsApplicationEditForm
        tournamentId={params.id}
        applicationId={params.applicationId}
        title={title}
      />
    </Stack>
  );
};

export default Page;
