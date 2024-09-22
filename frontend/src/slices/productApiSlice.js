import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `${BASE_URL}/api/products`,
            providesTags: ['Product'],
            // transformResponse: responseData=>responseData.data
        }),
    })
});

export const {
    useGetProductsQuery,
} = productApiSlice;
