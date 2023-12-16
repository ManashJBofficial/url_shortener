/**
 * publicLinkSlice.ts defines a Redux slice for managing public links state.
 *
 * It exports the publicLinkSlice reducer, as well as the setPublicLinks and addPublicLinks
 * action creators used to update the state.
 *
 * The state contains an array of PublicLinkType objects representing individual public links.
 * PublicLinkType defines the schema for a public link, containing id, urls, userId, and timestamp.
 *
 * The reducers allow replacing the entire publicLinks array, or pushing a new link.
 */
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
