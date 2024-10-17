import { Player, Team, TeamDTO } from '@/components/dashboard/teams/types';
import { rootApi } from '@/lib/store/api';

export type PaginationTypes = {
  current_page: number;
  next_page: number;
  prev_page: number;
  total_pages: number;
  total_records: number;
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
    }),
    getTeamById: build.query<TeamDTO, number | string | undefined>({
      query: (id) => `user/teams/${id}`,
    }),
    saveTeam: build.mutation<Team, RequestSaveTeam>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/teams/${data.id ?? ''}`,
        body: data,
      }),
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamByIdQuery, useSaveTeamMutation } = teamsApi;
