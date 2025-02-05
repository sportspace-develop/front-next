import { Player } from '@/components/dashboard/teams/types';
import {
  Tournament,
  TournamentApplication,
  TournamentDTO,
} from '@/components/dashboard/tournaments/types';
import { CacheTag, rootApi } from '@/lib/store/api';

import { ApplicationStatus } from '../types';

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

export type RequestUpdateTournamentsApplication = {
  applicationId: number | string;
  tournamentId: number | string;
  application: {
    status: ApplicationStatus;
  };
};

type RequestGetTournamentsApplicationById = {
  tournamentId: number | string;
  applicationId: number | string;
};

type TournamentApplicationDTO = TournamentApplication & {
  players: Player[];
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
    getTournamentsApplicationById: build.query<
      TournamentApplicationDTO,
      RequestGetTournamentsApplicationById
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
      RequestUpdateTournamentsApplication
    >({
      query: (data) => ({
        method: 'PUT',
        url: `user/tournaments/${data.tournamentId}/applications/${data.applicationId}`,
        body: data.application,
      }),
      invalidatesTags: [CacheTag.TOURNAMENT_APPLICATIONS],
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useSaveTournamentMutation,
  useGetTournamentsApplicationByIdQuery,
  useGetTournamentsApplicationsQuery,
  useUpdateTournamentsApplicationMutation,
} = tournamentsApi;
