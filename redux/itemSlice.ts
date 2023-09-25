import { createSlice } from "@reduxjs/toolkit";

type ItemType = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [] as ItemType[],
  },
  reducers: {
    setItems: (state, action) => {
      state.list = action.payload;
    },
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setItems, addItem } = itemsSlice.actions;

export default itemsSlice.reducer;
