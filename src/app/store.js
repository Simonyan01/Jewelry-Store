import { configureStore } from "@reduxjs/toolkit"
import collectionReducer from "../features/collections/CollectionSlice"
import charmReducer from "../features/charms/CharmSlice"
import boardReducer from "../features/board/BoardSlice"
import headerReducer from "../features/header/HeaderSlice"

export const store = configureStore({
  reducer: {
    header: headerReducer,
    collections: collectionReducer,
    charms: charmReducer,
    board: boardReducer,
  },
})
