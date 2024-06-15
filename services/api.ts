import { getStorageItemAsync } from "@/hooks/useStorageState";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export interface PaginationLinks {
  next?: string;
  prev?: string; 
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

interface ActiveDomain {
  id: number;
  domain: string;
  exists_since: string;
  starting_date: string;
  ending_date: string;
  status: DomainStatus;
  latest_bid_amount: number;
}

interface ClosedDomain {
  id: number;
  domain: string;
  exists_since: string;
  status: DomainStatus;
  latest_bid_amount: number;
  substatus: DomainSubStatus
}

interface UpcomingDomain {
  id: number;
  domain: string;
  exists_since: string;
  starting_date: string;
  ending_date: string;
  status: DomainStatus;
}

export type DomainInfo = ActiveDomain | ClosedDomain | UpcomingDomain;

export enum DomainStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  UPCOMING = "UPCOMING",
}

export enum DomainSubStatus {
  CLOSED = "CLOSED",
  WON = 'WON'
}

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await getStorageItemAsync("session");
      headers.set("Origin", "test.com");
      headers.set("Referer", "test.com");
      headers.set("Accept", "application/json");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    TwoFactorAuthenticationLogin: builder.mutation({
      query: (body) => ({
        url: "login/2fa",
        method: "POST",
        body,
      }),
    }),
    getDomains: builder.query<
      PaginatedResponse<DomainInfo>,
      { page: number; status: DomainStatus; isFullResponseEnabled?: boolean }
    >({
      query: ({
        page = 1,
        status = DomainStatus.ACTIVE,
        isFullResponseEnabled = true,
      }) => {
        const getPageParam = `page=${page}`;
        const getStatusParam = `status=${status}`;
        const getIsFullResponseParam = `full-response=${
          isFullResponseEnabled ? "1" : "0"
        }`;
        const queryParams = [
          getPageParam,
          getStatusParam,
          getIsFullResponseParam,
        ].join("&");

        return {
          url: `domains?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useTwoFactorAuthenticationLoginMutation,
  useGetDomainsQuery,
} = appApi;
