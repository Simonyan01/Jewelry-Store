import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bagURL = "http://localhost:8080/bag"

// Selected States

export const selectBagState = state => state.bag

// GET METHOD

export const getBagList = createAsyncThunk(
    "bag/getBagList",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(bagURL)
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to get bag list")
        }
    }
)

// POST METHOD

export const postToBagList = createAsyncThunk(
    "bag/postBagList",
    async (req, thunkAPI) => {
        try {
            const res = await axios.post(bagURL, req)
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Failed to post bag list")
        }
    }
)

// DELETE METHOD

export const deleteInBagList = createAsyncThunk(
    "Bag/postCardToBag",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${bagURL}/${id}`)
            return res?.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to delete bag list"
            )
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    value: 1,
    bag: [],
}

const bagSlice = createSlice({
    name: "bag list",
    initialState,
    reducers: {
        decrement: (state, action) => {
            const { id } = action.payload;
            const itemToUpdate = state.bag.find(item => item.id === id);
            if (itemToUpdate.value > 1) {
                itemToUpdate.value -= 1;
            }
        },
        increment: (state, action) => {
            const { id } = action.payload;
            const itemToUpdate = state.bag.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.value += 1;
            }
        }
    },
    extraReducers: (builder) => {
        // GET
        builder
            .addCase(getBagList.pending, (state) => {
                state.loading = true
            })
            .addCase(getBagList.fulfilled, (state, action) => {
                state.bag = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getBagList.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // DELETE
            .addCase(deleteInBagList.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteInBagList.fulfilled, (state, action) => {
                state.bag = state.bag.filter(item => item.id !== action.payload);
                state.loading = false;
                state.error = null
            })
            .addCase(deleteInBagList.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    },
})

export const { increment, decrement } = bagSlice.actions

export default bagSlice.reducer
