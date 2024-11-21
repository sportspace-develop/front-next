import { Tournament } from '@/components/dashboard/tournaments/types';
import { CacheTag, rootApi } from '@/lib/store/api';

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
  }),
});

export const { useGetTournamentsQuery } = tournamentsApi;
