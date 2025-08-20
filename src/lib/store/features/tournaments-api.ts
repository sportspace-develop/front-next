import { Tournament, TournamentApplication } from '@/components/dashboard/tournaments/types';
import { CacheTag, rootApi } from '@/lib/store/api';

import { Player, TournamentApplicationUpdateStatuses } from '../types';

export type TournamentDTO = Omit<Tournament, 'id'> & { id?: Tournament['id'] };

export type TournamentSaveDTO = Omit<TournamentDTO, 'organization' | 'organizationID'>;

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

export type PayloadUpdateTournamentsApplication = {
  applicationId: number | string;
  tournamentId: number | string;
  status: TournamentApplicationUpdateStatuses;
};

type PayloadGetTournamentsApplicationById = {
  tournamentId: number | string;
  applicationId: number | string;
};

type TournamentApplicationDTO = TournamentApplication & {
  players: Player[];
};

export const tournamentsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTournaments: build.query<ResponseGetTournaments, { page: number; limit: number }>({
      query: (data) => ({
        url: `tournaments?page=${data.page}&limit=${data.limit}`,
      }),
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.ALL_TOURNAMENTS];
        }

        return [
          CacheTag.ALL_TOURNAMENTS,
          ...result.data.map(({ id }) => ({ id, type: CacheTag.ALL_TOURNAMENTS })),
        ];
      },
    }),
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
      keepUnusedDataFor: 0, // отключаем кеширование чтобы каждый раз запрашивались данные
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TOURNAMENT];
        }

        return [CacheTag.TOURNAMENT, { id: result.id, type: CacheTag.TOURNAMENT }];
      },
    }),
    saveTournament: build.mutation<Tournament, TournamentSaveDTO>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/tournaments/${data.id ?? ''}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.ALL_TOURNAMENTS, CacheTag.TOURNAMENTS, CacheTag.TOURNAMENT],
    }),
    getTournamentsApplicationById: build.query<
      TournamentApplicationDTO,
      PayloadGetTournamentsApplicationById
    >({
      query: (data) => `user/tournaments/${data.tournamentId}/applications/${data.applicationId}`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TOURNAMENT_APPLICATION];
        }

        return [
          CacheTag.TOURNAMENT_APPLICATION,
          { id: result.id, type: CacheTag.TOURNAMENT_APPLICATION },
        ];
      },
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
    updateTournamentsApplication: build.mutation<
      TournamentApplication,
      PayloadUpdateTournamentsApplication
    >({
      query: (data) => ({
        method: 'PUT',
        url: `user/tournaments/${data.tournamentId}/applications/${data.applicationId}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TOURNAMENT_APPLICATIONS, CacheTag.TOURNAMENT_APPLICATION],
    }),
  }),
});

export const {
  useGetAllTournamentsQuery,
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useSaveTournamentMutation,
  useGetTournamentsApplicationByIdQuery,
  useGetTournamentsApplicationsQuery,
  useUpdateTournamentsApplicationMutation,
} = tournamentsApi;
