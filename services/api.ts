import { getStorageItemAsync } from '@/hooks/useStorageState';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.EXPO_PUBLIC_API_URL;


export interface PaginationLinks {
  next?: string; // Optional because the last page may not have a 'next' link
  prev?: string; // Optional to handle previous page link if needed
}

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface DomainInfo {
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
    getDomains: builder.query<PaginatedResponse<DomainInfo>, number>({
      query: (page = 1) => ({
        url: `domains?page=${page}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { 
  useLoginMutation, 
  useTwoFactorAuthenticationLoginMutation,
  useGetDomainsQuery,
 } = appApi;
