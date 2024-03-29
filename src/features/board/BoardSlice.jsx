import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const colourBoardURL = "http://localhost:8080/color_board"
const beltBoardURL = "http://localhost:8080/belt_board"

// Selected States

export const selectBoardState = state => state.board

// GET METHOD

export const getColorBoard = createAsyncThunk(
    "getColorBoard",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(colourBoardURL, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return res?.data
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
            const res = await axios.get(beltBoardURL, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to get belt board")
        }
    }
)

// DELETE METHOD

export const deleteBeltBoardItem = createAsyncThunk(
    "deleteBeltBoardItem",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${beltBoardURL}/${id}`)
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to delete belt board item"
            )
        }
    }
)

const initialState = {
    activeLink: null,
    loading: false,
    isPainted: "",
    beltBoard: [],
    colorBoard: [],
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
        deleteItems: (state) => {
            state.beltBoard = []
        },
        changeBox: (state, action) => {
            let i = state.box.indexOf(undefined)
            state.box[i] = action.payload
        }
    },
    extraReducers: (builder) => {
        //  GET COLOUR BOARD
        builder
            .addCase(getColorBoard.pending, (state) => {
                state.loading = true
            })
            .addCase(getColorBoard.fulfilled, (state, action) => {
                state.colorBoard = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getColorBoard.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            //  GET BELT BOARD
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
            //  DELETE BELT BOARD ITEM
            .addCase(deleteBeltBoardItem.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteBeltBoardItem.fulfilled, (state, action) => {
                state.beltBoard = state.beltBoard.filter((el) => el.id !== action.payload);
                state.loading = false;
                state.error = null
            })
            .addCase(deleteBeltBoardItem.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export const { switchToActive, changeBeltColour, deleteItems, changeBox } = boardSlice.actions

export default boardSlice.reducer
