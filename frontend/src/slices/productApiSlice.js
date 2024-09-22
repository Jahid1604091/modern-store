
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `${BASE_URL}/api/products`,
            providesTags: ['Product'],
            keepUnusedDataFor:5, //data will be cached for 5 seconds after it’s no longer in use.
            transformResponse: res=>res.data
        }),
    })
});

export const {
    useGetProductsQuery,
} = productApiSlice;
