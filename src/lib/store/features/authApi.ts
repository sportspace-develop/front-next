import { rootApi } from '@/lib/store/api';

type PayloadOtp = {
  email: string;
};

type PayloadLogin = PayloadOtp & { otp: string };

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, PayloadLogin>({
      query: (data) => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
    }),
    requestOtp: build.mutation<void, PayloadOtp>({
      query: (data) => ({
        method: 'POST',
        url: 'auth/otp',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRequestOtpMutation } = authApi;
