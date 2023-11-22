/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { getCollections } from "../../components/content/home/fetchAPI";

// Selected States

export const selectCollections = state => state.collections.collection
export const selectLoading = state => state.collections.loading

const initialState = {
    collection: [],
    loading: false,
    error: null,
}

const CollectionSlice = createSlice({
    name: "collections",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCollections.pending, (state) => {
                state.loading = true
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

export default CollectionSlice.reducer
