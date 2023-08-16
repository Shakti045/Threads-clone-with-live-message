import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    editmode: false,
    profile: null,
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setprofile: (state, action) => {
            state.profile = action.payload
        },
        seteditmode: (state, action) => {
            state.editmode = action.payload
        }
    }

})

export const { setprofile, seteditmode } = profileSlice.actions
export default profileSlice.reducer