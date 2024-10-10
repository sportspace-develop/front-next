import { Player, PlayerEditFormData } from '@/components/dashboard/teams/types';
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

export const playersApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getPlayers: build.query<ResponseGetPlayers['data'], void>({
      query: () => ({
        url: 'user/teams',
      }),
      transformResponse: (response: ResponseGetPlayers) => response.data,
    }),
    // нету всех игроков
    // getTeamById: build.query<Team, string | undefined>({
    //   query: (id) => `user/teams/${id}`,
    //   transformResponse: (response: Team) => {
    //     return {
    //       ...response,
    //       photo: { url: response.photo_url, file: null },
    //       logo: { url: response.logo_url, file: null },
    //     };
    //   },
    // }),
    savePlayer: build.mutation<Player, PlayerEditFormData>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/players/${data.id ?? ''}`,
        body: data,
      }),
    }),
    uploadPlayerImage: build.mutation<string, { id: string; formData: FormData }>({
      query: (data) => {
        console.log(data);

        return {
          method: 'PUT',
          url: `user/players/${data.id}/upload`,
          body: data.formData,
        };
      },
    }),
  }),
});

export const { useSavePlayerMutation, useGetPlayersQuery, useUploadPlayerImageMutation } =
  playersApi;
