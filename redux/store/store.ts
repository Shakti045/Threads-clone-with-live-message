import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../slices/userslice";
import { threadSlice } from "../slices/threadslice";
import { threadrepostSlice } from "../slices/repostslice";
import { profileSlice } from "../slices/profileslice";
export const store=configureStore({
    reducer: {
        user:userSlice.reducer,
        thread:threadSlice.reducer,
        threadrepost:threadrepostSlice.reducer,
        profile:profileSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;