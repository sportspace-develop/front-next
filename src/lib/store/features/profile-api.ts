import { CacheTag, rootApi } from '@/lib/store/api';

type ProfileDTO = {
  id: string;
  email: string;
};

export const profileApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileDTO, void>({
      query: () => ({ url: '/user/profile' }),
      providesTags: (_, error) => (error ? [] : [CacheTag.PROFILE]),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
