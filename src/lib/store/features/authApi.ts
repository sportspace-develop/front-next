// Need to use the React-specific entry point to import `createApi`
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type PayloadOtp = {
  email: string;
};

type PayloadLogin = PayloadOtp & {otp: string};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/v1'}),
  reducerPath: 'authApi',
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

export const {useLoginMutation, useRequestOtpMutation} = authApi;
