/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { getCollections } from "../../components/content/home/fetchAPI";

// Selected States

export const selectCollections = state => state.collections.collection
export const selectLoading = state => state.collections.loading
export const selectError = state => state.collections.error
export const selectActiveLink = state => state.collections.activeLink

const initialState = {
    collection: [],
    loading: false,
    error: null,
    activeLink: null
}

const CollectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollections.pending, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
            .addCase(getCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.collection = action.payload;
                state.error = null
            })
            .addCase(getCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export const { switchToActive } = CollectionSlice.actions

export default CollectionSlice.reducer
