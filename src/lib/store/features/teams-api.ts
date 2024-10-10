import { Team } from '@/components/dashboard/teams/types';
import { rootApi } from '@/lib/store/api';

type ResponseGetTeams = {
  data: Team[];
  pagination: {
    current_page: number;
    next_page: number;
    prev_page: number;
    total_pages: number;
    total_records: number;
  };
};

export const teamsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<ResponseGetTeams['data'], void>({
      query: () => ({
        url: 'user/teams',
      }),
      transformResponse: (response: ResponseGetTeams) => response.data,
    }),
    getTeamById: build.query<Team, string | undefined>({
      query: (id) => `user/teams/${id}`,
      transformResponse: (response: Team) => {
        return {
          ...response,
          photo: { url: response.photo_url, file: null },
          logo: { url: response.logo_url, file: null },
        };
      },
    }),
    saveTeam: build.mutation<Team, Team>({
      query: (data) => ({
        method: data.id ? 'PUT' : 'POST',
        url: `user/teams/${data.id ?? ''}`,
        body: data,
      }),
    }),
    uploadTeamImage: build.mutation<string, { id: string; formData: FormData }>({
      query: (data) => {
        console.log(data);

        return {
          method: 'PUT',
          url: `user/teams/${data.id}/upload`,
          body: data.formData,
        };
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useUploadTeamImageMutation,
} = teamsApi;
