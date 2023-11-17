import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./linkSlice"; // Import the itemsSlice reducer
import publicLinksReducer from "./publicLinkSlice"; // Import the itemsSlice reducer

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    items: linksReducer,
    publicLinks: publicLinksReducer,
  },
});

export default store;
