'use client';

import * as React from 'react';

import { Unstable_Grid2 as Grid, Pagination, Stack } from '@mui/material';

import { ListHeader, ListNoData, SkeletonList } from '@/components/ui/list';
import { useGetTournamentsQuery } from '@/lib/store/features/tournaments-api';

import TournamentItem from './tournament-item';

const PAGE_ELEMENT_LIMIT = 12;

const TournamentsList = React.memo((): React.JSX.Element => {
  const [page, setPage] = React.useState(1);

  const { isLoading, data } = useGetTournamentsQuery({
    limit: PAGE_ELEMENT_LIMIT,
    page,
  });

  const tournaments = React.useMemo(() => data?.data || [], [data?.data]);
  const pagination = React.useMemo(() => data?.pagination, [data?.pagination]);

  const isEmptyList = React.useMemo(() => tournaments.length === 0, [tournaments]);

  const handleChange = React.useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [setPage],
  );

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <ListHeader text="Турниры" />
      </Stack>
      {isLoading && <SkeletonList />}
      {!isLoading && isEmptyList && <ListNoData />}
      <Grid container spacing={3}>
        {tournaments.map((item) => (
          <Grid key={item.id} md={4} sm={6} xs={12} display="grid">
            <TournamentItem item={item} />
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

export default TournamentsList;
