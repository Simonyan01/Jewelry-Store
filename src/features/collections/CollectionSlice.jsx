import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const collectionURL = "http://localhost:8080/collection"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectCollections = state => state.collections

// GET METHOD

export const getCollections = createAsyncThunk(
    "collections/getCollections",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(collectionURL)
            return res?.data
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
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to post collections"
            )
        }
    }
)

const initialState = {
    activeHeart: null,
    activeLink: null,
    modalSrc: false,
    loading: false,
    collection: [],
    error: null,
}

const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
        switchToActiveHeart: (state, action) => {
            state.activeHeart = action.payload
        },
        seeMoreInfo: (state, action) => {
            state.modalSrc = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollections.pending, (state) => {
                state.loading = true
            })
            .addCase(getCollections.fulfilled, (state, action) => {
                state.collection = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getCollections.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export const { switchToActive, seeMoreInfo, switchToActiveHeart } = collectionSlice.actions

export default collectionSlice.reducer
