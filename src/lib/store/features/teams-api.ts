import { Player, Team, TeamDTO } from '@/components/dashboard/teams/types';
import { CacheTag, rootApi } from '@/lib/store/api';

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

export type RequestSaveTeam = Omit<Team, 'players' | 'id'> & {
  id?: Team['id'];
  playerIds?: Player['id'][];
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
    saveTeam: build.mutation<Team, RequestSaveTeam>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/teams/${data.id ?? ''}`,
        body: data,
      }),
      invalidatesTags: [CacheTag.TEAMS, CacheTag.TEAM],
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamByIdQuery, useSaveTeamMutation } = teamsApi;
