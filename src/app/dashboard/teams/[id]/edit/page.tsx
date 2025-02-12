import { Metadata, NextPage } from 'next';
import NextLink from 'next/link';

import { Link, Stack, Typography } from '@mui/material';

import TabsTeamEditForm from '@/components/dashboard/teams/edit/team-tabs-edit-form';
import BackToLink from '@/components/ui/back-to-link';
import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Редактировать команду | ${config.site.name}` } satisfies Metadata;

const title = 'Редактирование команды';

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
        <BackToLink text="Вернуться к списку команд" href={paths.dashboard.teams.index} />
        <Link
          component={NextLink}
          href={`${paths.dashboard.teams.index}/${params.id}/applications`}
        >
          <Typography variant="subtitle2">К списку заявок на турниры</Typography>
        </Link>
      </Stack>
      <TabsTeamEditForm title={title} id={params.id} />
    </Stack>
  );
};

export default Page;
