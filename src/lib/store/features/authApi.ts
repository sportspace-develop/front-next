// Need to use the React-specific entry point to import `createApi`
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type PayloadOtp = {
  email: string;
};

type PayloadLogin = PayloadOtp & {otp: string};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/v1'}),
  reducerPath: 'authApi',
  endpoints: (build) => ({
    login: build.mutation<void, PayloadLogin>({
      query: () => ({
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    otp: build.mutation<void, PayloadOtp>({
      query: (data) => ({
        method: 'POST',
        url: 'auth/otp',
        body: data,
      }),
    }),
  }),
});

export const {useLoginMutation, useOtpMutation} = authApi;
