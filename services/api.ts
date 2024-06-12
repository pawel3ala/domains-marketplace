// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Origin', 'test.com');
            headers.set('Referer', 'test.com');
            headers.set('Accept', 'application/json');
            return headers;
        }
  ,}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    TwoFactorAuthenticationLogin: builder.mutation({
      query: (credentials) => ({
        url: 'login/2fa',
        method: 'POST',
        body: credentials,
      }),
    })
  }),
})

export const { useLoginMutation } = appApi;
