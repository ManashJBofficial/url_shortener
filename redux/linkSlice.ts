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
  },
});

export const { setLinks, addLinks } = linksSlice.actions;

export default linksSlice.reducer;
