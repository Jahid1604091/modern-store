import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        // app: appReducer,
        // auth: authReducer,

        [apiSlice.reducerPath]: apiSlice.reducer,
        cart:cartSliceReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware]),
    devTools: true //false in deployment
});