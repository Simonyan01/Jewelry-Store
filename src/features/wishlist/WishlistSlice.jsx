import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const wishlistURL = "http://localhost:8080/wishlist"

// Selected States

export const selectActiveLink = state => state.wishlist.activeLink
export const selectModalSrc = state => state.wishlist.modalSrc
export const selectWishlist = state => state.wishlist.wishlist
export const selectLoading = state => state.wishlist.loading
export const selectError = state => state.wishlist.error

// GET METHOD

export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(wishlistURL)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to get wishlist"
            )
        }
    }
)

// POST METHOD

export const postToWishlist = createAsyncThunk(
    "wishlist/postCardToWishlist",
    async (req, thunkAPI) => {
        try {
            const res = await axios.post(wishlistURL, req)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to post wishlist"
            )
        }
    }
)

// DELETE METHOD

export const deleteInWishlist = createAsyncThunk(
    "wishlist/postCardToWishlist",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete(`${wishlistURL}/${id}`)
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.message || "Failed to post wishlist"
            )
        }
    }
)

const initialState = {
    activeLink: null,
    modalSrc: false,
    loading: false,
    wishlist: [],
    error: null,
}

const wishlistSlice = createSlice({
    name: "wishlist",
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
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(deleteInWishlist.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteInWishlist.fulfilled, (state, action) => {
                state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
                state.loading = false;
                state.error = null
            })
            .addCase(deleteInWishlist.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
})

export const { switchToActive, seeMoreInfo } = wishlistSlice.actions

export default wishlistSlice.reducer
