import NextLink from 'next/link';

import {Breadcrumbs, Link, Stack, Typography} from '@mui/material';

import {TeamCreateForm} from '@/components/dashboard/teams/team-create-form';
import {config} from '@/config';
import {paths} from '@/paths';

export const metadata = {title: `Create team | Dashboard | ${config.site.name}`} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Создать команду</Typography>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Breadcrumbs>
            <Link
              color="text.primary"
              component={NextLink}
              href={paths.dashboard.overview}
              variant="subtitle2"
            >
              Обзор
            </Link>
            <Link
              color="text.primary"
              component={NextLink}
              href={paths.dashboard.teams}
              variant="subtitle2"
            >
              Список команд
            </Link>
            <Typography color="text.secondary" variant="subtitle2">
              Создание команды
            </Typography>
          </Breadcrumbs>
        </Stack>
        <TeamCreateForm />
      </Stack>
    </Stack>
  );
}
