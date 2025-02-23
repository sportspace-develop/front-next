import * as React from 'react';

import { Tournament } from '@/components/dashboard/tournaments/types';
import { useGetTournamentsQuery } from '@/lib/store/features/tournaments-api';

type Item = Pick<Tournament, 'id' | 'title'>;

const useTournamentSelect = () => {
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = useGetTournamentsQuery({ page, limit: 6 });
  const [tournaments, setTournaments] = React.useState<Item[]>([]);

  const setUniqTournaments = React.useCallback((newTournaments: Item[]) => {
    setTournaments((prevTournaments) => {
      const filteredNewTournaments = newTournaments.filter(
        (newTournament) => !prevTournaments.some((t) => t.id === newTournament.id),
      );

      return [...prevTournaments, ...filteredNewTournaments];
    });
  }, []);

  React.useEffect(() => {
    if (data?.data) {
      setUniqTournaments(data.data);
    }
  }, [data, setUniqTournaments]);

  const loadTournamentsNextPage = () => {
    if (!!data?.pagination?.nextPage) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    tournaments,
    setTournaments: setUniqTournaments,
    loadTournamentsNextPage,
    isTournamentsLoading: isFetching,
  };
};

export default useTournamentSelect;
