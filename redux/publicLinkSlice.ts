import { createSlice } from "@reduxjs/toolkit";

type PublicLinkType = {
  id: string;
  long_url: string;
  short_code: string;
  userIdNo: string;
  created_at: Date;
};

const publicLinkSlice = createSlice({
  name: "publicLinks",
  initialState: {
    publicLink: [] as PublicLinkType[],
  },
  reducers: {
    setLinks: (state, action) => {
      state.publicLink = action.payload;
    },
    addLinks: (state, action) => {
      state.publicLink.push(action.payload);
    },
  },
});

export const { setLinks, addLinks } = publicLinkSlice.actions;

export default publicLinkSlice.reducer;
