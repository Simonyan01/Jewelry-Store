import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const colourBoardURL = "http://localhost:8080/color_board"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectColorBoard = state => state.board.board
export const selectBeltColour = state => state.board.isPainted
export const selectActiveLink = state => state.board.activeLink
export const selectBox = state => state.board.box

// GET 

export const getColorBoard = createAsyncThunk(
    "getColorBoard",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(colourBoardURL)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to get color board"
            )
        }
    }
)

export const getBeltBoard = createAsyncThunk(
    "getBeltBoard",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(beltBoardURL)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to get belt board")
        }
    }
)

const initialState = {
    activeLink: null,
    loading: false,
    isPainted: "",
    board: [],
    box: [
        undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined
    ]
}

const boardSlice = createSlice({
    name: "belt board",
    initialState,
    reducers: {
        switchToActive: (state, action) => {
            state.activeLink = action.payload
        },
        changeBeltColour: (state, action) => {
            state.isPainted = action.payload
        },
        clearBeltItems: (state, action) => {
            state.board = state.board.filter(val => val.id !== action.payload.id)
        },
        changeBox: (state, action) => {
            let i = state.box.indexOf(undefined)
            state.box[i] = action.payload
        }
    },
    extraReducers: (builder) => {
        // COLOUR BOARD
        builder
            .addCase(getColorBoard.pending, (state) => {
                state.loading = true
            })
            .addCase(getColorBoard.fulfilled, (state, action) => {
                state.board = action.payload;
                state.loading = false;
            })
            .addCase(getColorBoard.rejected, (state) => {
                state.loading = false;
            })
    },
})

export const { switchToActive, changeBeltColour, clearBeltItems, changeBox } = boardSlice.actions

export default boardSlice.reducer
