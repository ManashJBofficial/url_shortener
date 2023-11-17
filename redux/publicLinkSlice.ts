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
    setPublicLinks: (state, action) => {
      state.publicLink = action.payload;
    },
    addPublicLinks: (state, action) => {
      state.publicLink.push(action.payload);
    },
  },
});

export const { setPublicLinks, addPublicLinks } = publicLinkSlice.actions;

export default publicLinkSlice.reducer;
