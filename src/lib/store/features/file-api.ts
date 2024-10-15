import { rootApi } from '@/lib/store/api';

type ResponseUploadFile = {
  filename: string;
  url: string;
};

export const fileApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<ResponseUploadFile, FormData>({
      query: (body) => ({
        url: 'user/upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
