import { configureStore } from "@reduxjs/toolkit"
import collectionReducer from "../features/collections/CollectionSlice"

export const store = configureStore({
  reducer: {
    collections: collectionReducer,
  },
})
