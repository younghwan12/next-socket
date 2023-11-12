import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { config } from "@/config/config"

const baseQuery = fetchBaseQuery({
  baseUrl: config?.url.API_BACK_URL,
})

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
})

export default appApi
