import { rootApi } from '@/lib/store/api';

type ResponseUploadFile = {
  filename: string;
  url: string;
};

export const fileApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<ResponseUploadFile, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append('file', file);

        return {
          url: 'user/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = fileApi;
