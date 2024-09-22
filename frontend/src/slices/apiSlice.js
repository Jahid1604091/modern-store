import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["User", "Product", "Order"],
    endpoints: (builder) => ({}),
});

