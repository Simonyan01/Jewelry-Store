import { createSlice } from "@reduxjs/toolkit";

// Selected States

export const selectHeaderState = state => state.header

const initialState = {
    activeLink: null,
    languageBar: false
}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
        toggleBar: (state, action) => {
            state.languageBar = action.payload
        }
    }
})

export const { switchToActive, toggleBar } = headerSlice.actions

export default headerSlice.reducer
