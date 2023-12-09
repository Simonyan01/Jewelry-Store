import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getBeltBoard } from "../board/BoardSlice";

const charmURL = "http://localhost:8080/charm"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectActiveLink = state => state.charms.activeLink
export const selectModalSrc = state => state.charms.modalSrc
export const selectLoading = state => state.charms.loading
export const selectBoard = state => state.charms.beltBoard
export const selectCharms = state => state.charms.charm
export const selectError = state => state.charms.error

// GET METHOD

export const getCharms = createAsyncThunk(
    "charms/getCharms",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(charmURL)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to get charms")
        }
    }
)

// POST METHOD

export const postCharms = createAsyncThunk(
    "charms/postCharms",
    async (req, thunkAPI) => {
        try {
            const res = await axios.post(beltBoardURL, req)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to post charms")
        }
    }
)

const initialState = {
    activeLink: null,
    modalSrc: false,
    loading: false,
    beltBoard: [],
    error: null,
    charm: [],
}

const charmSlice = createSlice({
    name: "charms",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
        seeMoreInfo: (state, action) => {
            state.modalSrc = action.payload
        }
    },
    extraReducers: (builder) => {
        // CHARMS
        builder
            .addCase(getCharms.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharms.fulfilled, (state, action) => {
                state.loading = false;
                state.charm = action.payload;
                state.error = null
            })
            .addCase(getCharms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // BELT BOARD
            .addCase(getBeltBoard.pending, (state) => {
                state.loading = true
            })
            .addCase(getBeltBoard.fulfilled, (state, action) => {
                state.beltBoard = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getBeltBoard.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export const { switchToActive, seeMoreInfo } = charmSlice.actions

export default charmSlice.reducer
