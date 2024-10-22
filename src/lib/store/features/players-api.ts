import { Player, PlayerDTO } from '@/components/dashboard/teams/types';
import { rootApi } from '@/lib/store/api';

type PaginationTypes = {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalRecords: number;
};

type ResponseGetPlayers = {
  data: Player[];
  pagination: PaginationTypes;
};

export type RequestBatchPlayer = Omit<Player, 'id'> & {
  id?: Player['id'];
};

export const playersApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<ResponseGetPlayers, void>({
      query: () => ({
        url: 'user/teams',
      }),
    }),
    saveBatchPlayer: build.query<{ data: Player[] }, RequestBatchPlayer[]>({
      query: (data) => ({
        method: 'POST',
        url: 'user/players/batch',
        body: data,
      }),
    }),
    savePlayer: build.mutation<Player, PlayerDTO>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/players/${data.id ?? ''}`,
        body: data,
      }),
    }),
  }),
});

export const { useSavePlayerMutation, useGetPlayersQuery, useSaveBatchPlayerQuery } = playersApi;
