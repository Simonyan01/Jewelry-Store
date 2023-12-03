import { configureStore } from "@reduxjs/toolkit"
import collectionReducer from "../features/collections/CollectionSlice"
import charmReducer from "../features/charms/CharmSlice"
import colorBoardReducer from "../features/board/ColorBoardSlice"

export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    charms: charmReducer,
    board: colorBoardReducer,
  },
})
