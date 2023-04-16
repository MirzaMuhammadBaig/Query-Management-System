import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://query-management-system.vercel.app/",
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Transactions"],
  endpoints: (build) => ({
    getUserQueries: build.query({
      query: (id) => `query/get/${id}`,
      providesTags: ["User"],
    }),
    // getTransactions: build.query({
    //   query: ({ page, pageSize, sort, search }) => ({
    //     url: "client/transactions",
    //     method: "GET",
    //     params: { page, pageSize, sort, search },
    //   }),
    //   providesTags: ["Transactions"],
    // }),
  }),
})

export const { useGetUserQueriesQuery } = api
