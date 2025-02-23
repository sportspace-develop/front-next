import { Team, TeamApplication, TeamDTO } from '@/components/dashboard/teams/types';
import { Tournament } from '@/components/dashboard/tournaments/types';
import { CacheTag, rootApi } from '@/lib/store/api';

import { Player, TeamApplicationUpdateStatuses } from '../types';

export type PaginationTypes = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalRecords: number;
};

type ResponseGetTeams = {
  data: Team[];
  pagination: PaginationTypes;
};

export type PayloadSaveTeam = Omit<Team, 'players' | 'id'> & {
  id?: Team['id'];
  playerIds?: Player['id'][];
};

export type PayloadCreateTeamsApplication = {
  teamId: Team['id'];
  tournamentId?: Tournament['id'];
  playerIds?: Player['id'][];
};

export type PayloadUpdateTeamsApplication = {
  teamId: Team['id'];
  applicationId: TeamApplication['id'];
  playerIds: Player['id'][];
  status?: TeamApplicationUpdateStatuses;
};

type PayloadGetTeamsApplicationById = {
  teamId: number | string;
  applicationId?: number | string;
};

export type TeamApplicationsDTO = {
  data: TeamApplication[];
};

export type TeamApplicationItemDTO = TeamApplication & {
  players?: Player[];
};

export const teamsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<ResponseGetTeams, { page: number; limit: number }>({
      query: (data) => ({
        url: `user/teams?page=${data.page}&limit=${data.limit}`,
      }),
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TEAMS];
        }

        return [CacheTag.TEAMS, ...result.data.map(({ id }) => ({ id, type: CacheTag.TEAMS }))];
      },
    }),
    getTeamById: build.query<TeamDTO, number | string | undefined>({
      query: (id) => `user/teams/${id}`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TEAM];
        }

        return [CacheTag.TEAM, { id: result.id, type: CacheTag.TEAM }];
      },
    }),
    saveTeam: build.mutation<Team, PayloadSaveTeam>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/teams/${data.id ?? ''}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TEAMS, CacheTag.TEAM],
    }),
    getTeamsApplicationById: build.query<TeamApplicationItemDTO, PayloadGetTeamsApplicationById>({
      query: (data) => `user/teams/${data.teamId}/applications/${data.applicationId}`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TEAM_APPLICATION];
        }

        return [CacheTag.TEAM_APPLICATION, { id: result.id, type: CacheTag.TEAM_APPLICATION }];
      },
    }),
    getTeamsApplications: build.query<TeamApplicationsDTO, number | string>({
      query: (id) => `user/teams/${id}/applications`,
      providesTags: (result) => {
        if (!result) {
          return [CacheTag.TEAM_APPLICATIONS];
        }

        return [
          CacheTag.TEAM_APPLICATIONS,
          ...result.data.map(({ id }) => ({ id, type: CacheTag.TEAM_APPLICATIONS })),
        ];
      },
    }),
    createTeamsApplication: build.mutation<Team, PayloadCreateTeamsApplication>({
      query: (data) => ({
        method: 'POST',
        url: `user/teams/${data.teamId}/applications`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TEAM_APPLICATIONS, CacheTag.TEAM_APPLICATION],
      transformErrorResponse: (response) => {
        if (response.status === 409) {
          return {
            status: 'CUSTOM_ERROR',
            error: 'Заявка с выбранным турниром уже существует',
            data: response.data,
          };
        }

        return response;
      },
    }),
    updateTeamsApplication: build.mutation<Team, PayloadUpdateTeamsApplication>({
      query: (data) => ({
        method: 'PUT',
        url: `user/teams/${data.teamId}/applications/${data.applicationId}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TEAM_APPLICATIONS, CacheTag.TEAM_APPLICATION],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useSaveTeamMutation,
  useGetTeamsApplicationByIdQuery,
  useGetTeamsApplicationsQuery,
  useCreateTeamsApplicationMutation,
  useUpdateTeamsApplicationMutation,
} = teamsApi;
