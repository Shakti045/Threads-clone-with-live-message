import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    user: typeof window !== "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {

            state.user = action.payload
            typeof window !== "undefined" && localStorage.setItem("user", JSON.stringify(action.payload))
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer;