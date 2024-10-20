'use client';

import NextLink from 'next/link';

import * as React from 'react';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { Button, Unstable_Grid2 as Grid, Pagination, Stack } from '@mui/material';

import { ListHeader, ListNoData, SkeletonList } from '@/components/ui/list';
import { useGetTeamsQuery } from '@/lib/store/features/teams-api';
import { paths } from '@/paths';

import TeamItem from './team-item';

const PAGE_ELEMENT_LIMIT = 12;

const TeamsList = React.memo((): React.JSX.Element => {
  const [page, setPage] = React.useState(1);

  const { isLoading, data } = useGetTeamsQuery({
    limit: PAGE_ELEMENT_LIMIT,
    page,
  });

  const teams = React.useMemo(() => data?.data || [], [data?.data]);
  const pagination = React.useMemo(() => data?.pagination, [data?.pagination]);

  const isEmptyList = React.useMemo(() => teams.length === 0, [teams]);

  const handleChange = React.useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [setPage],
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <ListHeader text="Команды" />
        <Button
          component={NextLink}
          href={paths.dashboard.teams.new}
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          variant="contained"
          disabled={isLoading}
        >
          {isEmptyList ? 'Создать' : 'Добавить'}
        </Button>
      </Stack>
      {isLoading && <SkeletonList />}
      {!isLoading && isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {teams.map((item) => (
          <Grid key={item.id} md={4} sm={6} xs={12} display="grid">
            <TeamItem item={item} />
          </Grid>
        ))}
      </Grid>
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          count={pagination.totalPages} // Общее количество страниц
          page={pagination.currentPage} // Текущая страница
          onChange={handleChange}
          color="primary"
          sx={{ mt: 1 }}
        />
      )}
    </Stack>
  );
});

export default TeamsList;
