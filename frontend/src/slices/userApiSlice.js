
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/users/register`,
                method: "POST",
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/users/login`,
                method: "POST",
                body: data
            })
        }),

    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
} = userApiSlice;
