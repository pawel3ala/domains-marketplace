import { getStorageItemAsync } from '@/hooks/useStorageState';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

interface DomainInfo {
  id: number; 
  domain: string; 
  exists_since: string; 
  starting_date: string; 
  ending_date: string; 
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
}


export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl,
    prepareHeaders: async (headers) => {
      const token = await getStorageItemAsync('session');
      headers.set('Origin', 'test.com');
      headers.set('Referer', 'test.com');
      headers.set('Accept', 'application/json');
      headers.set("authorization", `Bearer ${token}`);
      return headers;
        }
  ,}),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    TwoFactorAuthenticationLogin: builder.mutation({
      query: (body) => ({
        url: 'login/2fa',
        method: 'POST',
        body,
      }),
    }),
    getDomains: builder.query({
      query: () => ({
        url: 'domains',
        method: 'GET',
      }),
    })
  }),
})

export const { 
  useLoginMutation, 
  useTwoFactorAuthenticationLoginMutation,
  useGetDomainsQuery,
 } = appApi;
