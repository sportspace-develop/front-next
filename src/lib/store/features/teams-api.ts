import { Player, Team, TeamEditFormData } from '@/components/dashboard/teams/types';
import { rootApi } from '@/lib/store/api';

import { PaginationTypes } from './teams-slice';

type ResponseGetTeams = {
  data: Team[];
  pagination: PaginationTypes;
};

export type RequestSaveTeam = Omit<Team, 'players' | 'id'> & {
  id?: Team['id'];
  player_ids?: Player['id'][];
};

const transformResponseForGetTeamById = (response: Team): TeamEditFormData => ({
  ...response,
  photo: {
    url: response.photo_url,
    file: null,
  },
  logo: {
    url: response.logo_url,
    file: null,
  },
  players: (response.players || []).map((player) => ({
    ...player,
    b_day: player.b_day ? new Date(player.b_day) : null,
    photo: {
      url: player.photo_url,
      file: null,
    },
  })),
});

export const teamsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<ResponseGetTeams, { page: number; limit: number }>({
      query: (data) => ({
        url: `user/teams?page=${data.page}&limit=${data.limit}`,
      }),
    }),
    getTeamById: build.query<TeamEditFormData, number | string | undefined>({
      query: (id) => `user/teams/${id}`,
      transformResponse: transformResponseForGetTeamById,
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
