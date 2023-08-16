import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    threads: [],
}

export const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.threads = action.payload
        }
    }
})


export const {setThreads} = threadSlice.actions
export default threadSlice.reducer;