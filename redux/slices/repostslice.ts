import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    thread:null,
};
export const threadrepostSlice = createSlice({
    name: "threadrepost",
    initialState,
    reducers: {
        setrepostThread: (state, action) => {
            state.thread = action.payload;
        }
    }
});
export const { setrepostThread } = threadrepostSlice.actions;
export default threadrepostSlice.reducer;
