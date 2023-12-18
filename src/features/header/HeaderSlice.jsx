import { createSlice } from "@reduxjs/toolkit";

// Selected States

export const selectHeaderState = state => state.header

const initialState = {
    activeLink: null,
    languageBar: false,
    language: "EN"
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
        },
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
    }
})

export const { switchToActive, toggleBar, changeLanguage } = headerSlice.actions

export default headerSlice.reducer
