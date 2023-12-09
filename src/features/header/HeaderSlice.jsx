import { createSlice } from "@reduxjs/toolkit";

// Selected States

export const selectActiveLink = state => state.header.activeLink
export const selectLanguageBar = state => state.header.languageBar

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
