import {
  Tournament,
  TournamentApplication,
  TournamentDTO,
} from '@/components/dashboard/tournaments/types';
import { CacheTag, rootApi } from '@/lib/store/api';

export type PaginationTypes = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalRecords: number;
};

type ResponseGetTournaments = {
  data: Tournament[];
  pagination: PaginationTypes;
};

type TournamentApplicationsDTO = {
  data: TournamentApplication[];
};

export const tournamentsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTournaments: build.query<ResponseGetTournaments, { page: number; limit: number }>({
      query: (data) => ({
        url: `user/tournaments?page=${data.page}&limit=${data.limit}`,
      }),
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TOURNAMENTS];
        }

        return [
          CacheTag.TOURNAMENTS,
          ...result.data.map(({ id }) => ({ id, type: CacheTag.TOURNAMENTS })),
        ];
      },
    }),
    getTournamentById: build.query<TournamentDTO, number | string | undefined>({
      query: (id) => `user/tournaments/${id}`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TOURNAMENT];
        }

        return [CacheTag.TOURNAMENT, { id: result.id, type: CacheTag.TOURNAMENT }];
      },
    }),
    saveTournament: build.mutation<Tournament, TournamentDTO>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/tournaments/${data.id ?? ''}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TOURNAMENTS, CacheTag.TOURNAMENT],
    }),
    getTournamentsApplications: build.query<TournamentApplicationsDTO, number | string>({
      query: (id) => `user/tournaments/${id}/applications`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TOURNAMENT_APPLICATIONS];
        }

        return [
          CacheTag.TOURNAMENT_APPLICATIONS,
          ...result.data.map(({ id }) => ({ id, type: CacheTag.TOURNAMENT_APPLICATIONS })),
        ];
      },
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useSaveTournamentMutation,
  useGetTournamentsApplicationsQuery,
} = tournamentsApi;
