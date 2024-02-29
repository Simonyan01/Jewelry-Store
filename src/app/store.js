import collectionReducer from "features/collections/CollectionSlice"
import wishlistReducer from "features/wishlist/WishlistSlice"
import headerReducer from "features/header/HeaderSlice"
import charmReducer from "features/charms/CharmSlice"
import boardReducer from "features/board/BoardSlice"
import bagReducer from "features/bag/BagSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    collections: collectionReducer,
    wishlist: wishlistReducer,
    header: headerReducer,
    charms: charmReducer,
    board: boardReducer,
    bag: bagReducer,
  },
})
