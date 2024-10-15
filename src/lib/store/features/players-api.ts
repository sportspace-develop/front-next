import { Player } from '@/components/dashboard/teams/types';
import { rootApi } from '@/lib/store/api';

type ResponseGetPlayers = {
  data: Player[];
  pagination: {
    current_page: number;
    next_page: number;
    prev_page: number;
    total_pages: number;
    total_records: number;
  };
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
    savePlayer: build.mutation<Player, RequestBatchPlayer>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/players/${data.id ?? ''}`,
        body: data,
      }),
    }),
  }),
});

export const { useSavePlayerMutation, useGetPlayersQuery, useSaveBatchPlayerQuery } = playersApi;
