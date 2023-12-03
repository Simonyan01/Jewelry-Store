import { createSlice } from "@reduxjs/toolkit";
import { getColorBoard } from "../../components/content/home/fetchAPI";

// Selected States

export const selectColorBoard = state => state.board.board
export const selectActiveLink = state => state.board.activeLink

const initialState = {
    board: [],
    loading: false,
    activeLink: null
}

const boardSlice = createSlice({
    name: "menu board",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColorBoard.pending, (state) => {
                state.loading = true
            })
            .addCase(getColorBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.board = action.payload;
            })
            .addCase(getColorBoard.rejected, (state) => {
                state.loading = false;
            });
    },
})

export const { switchToActive } = boardSlice.actions

export default boardSlice.reducer
