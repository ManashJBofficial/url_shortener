import { createSlice } from "@reduxjs/toolkit";

type LinkType = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

const linksSlice = createSlice({
  name: "links",
  initialState: {
    link: [] as LinkType[],
  },
  reducers: {
    setLinks: (state, action) => {
      state.link = action.payload;
    },
    addLinks: (state, action) => {
      state.link.push(action.payload);
    },
    deleteLinks: (state, action) => {
      state.link = state.link.filter((link) => link.id !== action.payload);
    },
  },
});

export const { setLinks, addLinks, deleteLinks } = linksSlice.actions;

export default linksSlice.reducer;
