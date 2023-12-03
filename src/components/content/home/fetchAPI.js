import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const collectionURL = "http://localhost:8080/collection"
const charmURL = "http://localhost:8080/charm"
const colorBoardURL = "http://localhost:8080/board"

export const getCollections = createAsyncThunk(
  "collections",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(collectionURL)
      return res.data
    } catch {
      return thunkAPI.rejectWithValue()
    }
  }
)

export const getCharms = createAsyncThunk(
  "unique charms",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(charmURL)
      return res.data
    } catch {
      return thunkAPI.rejectWithValue()
    }
  }
)

export const getColorBoard = createAsyncThunk(
  "color board",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(colorBoardURL)
      return res.data
    } catch {
      return thunkAPI.rejectWithValue()
    }
  }
)
