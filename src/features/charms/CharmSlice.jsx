import { createSlice } from "@reduxjs/toolkit";
import { getCharms } from "../../components/content/home/fetchAPI";

// Selected States

export const selectCharms = state => state.charms.charm
export const selectLoading = state => state.charms.loading
export const selectError = state => state.charms.error
export const selectActiveLink = state => state.charms.activeLink

const initialState = {
    charm: [],
    loading: false,
    error: null,
    activeLink: null
}

const charmSlice = createSlice({
    name: "charms",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharms.pending, (state, action) => {
                state.loading = true
                state.error = action.payload

            })
            .addCase(getCharms.fulfilled, (state, action) => {
                state.loading = false;
                state.charm = action.payload;
                state.error = null
            })
            .addCase(getCharms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export const { switchToActive } = charmSlice.actions

export default charmSlice.reducer
