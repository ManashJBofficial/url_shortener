import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemSlice"; // Import the itemsSlice reducer

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    items: itemsReducer, // Add the itemsSlice reducer
    // Add other reducers if needed
  },
});

export default store;
