import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const charmURL = "http://localhost:8080/charm"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectCharms = state => state.charms

// GET METHOD

export const getCharms = createAsyncThunk(
    "charms/getCharms",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(charmURL)
            return res?.data
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
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to post charms")
        }
    }
)

const initialState = {
    activeHeart: null,
    activeLink: null,
    modalSrc: false,
    loading: false,
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
        switchToActiveHeart: (state, action) => {
            state.activeHeart = action.payload
        },
        seeMoreInfo: (state, action) => {
            state.modalSrc = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharms.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharms.fulfilled, (state, action) => {
                state.charm = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getCharms.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export const { switchToActive, seeMoreInfo, switchToActiveHeart } = charmSlice.actions

export default charmSlice.reducer
