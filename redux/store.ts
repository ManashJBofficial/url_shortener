/**
 * Configures the Redux store with the root reducer and exported for use in the app.
 *
 * Imports the configureStore API from Redux Toolkit.
 * Imports the slice reducers for links and public links.
 * Defines the RootState type from the store's state.
 * Creates and configures the store with the root reducer containing the slice reducers.
 * Exports the store as the default export.
 */
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
