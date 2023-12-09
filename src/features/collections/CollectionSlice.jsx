import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBeltBoard } from "../board/BoardSlice";
import axios from "axios";

const collectionURL = "http://localhost:8080/collection"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectCollections = state => state.collections.collection
export const selectActiveLink = state => state.collections.activeLink
export const selectModalSrc = state => state.collections.modalSrc
export const selectLoading = state => state.collections.loading
export const selectBoard = state => state.collections.beltBoard
export const selectError = state => state.collections.error

// GET METHOD

export const getCollections = createAsyncThunk(
    "collections/getCollections",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(collectionURL)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to get collections"
            )
        }
    }
)

// POST METHOD

export const postCollections = createAsyncThunk(
    "collections/postCollections",
    async (req, thunkAPI) => {
        try {
            const res = await axios.post(beltBoardURL, req)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to post collections"
            )
        }
    }
)

const initialState = {
    activeLink: null,
    modalSrc: false,
    collection: [],
    loading: false,
    beltBoard: [],
    error: null,
}

const collectionSlice = createSlice({
    name: "collections",
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
        // COLLECTIONS
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
                state.error = action.error.message;
                state.loading = false;
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

export const { switchToActive, seeMoreInfo } = collectionSlice.actions

export default collectionSlice.reducer
