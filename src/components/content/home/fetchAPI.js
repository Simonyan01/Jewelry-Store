import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const collectionURL = "http://localhost:8080/collection"

export const getCollections = createAsyncThunk("collections", async () => {
  try {
    const res = await axios.get(collectionURL)
    return res.data
  } catch (err) {
    return err.message
  }
})
