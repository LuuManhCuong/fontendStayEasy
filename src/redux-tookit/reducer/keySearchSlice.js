import { createSlice } from "@reduxjs/toolkit";

export const keySearchSlice = createSlice({
  name: "keySearch",
  initialState: {
    keySearch: "",
  },
  reducers: {
    setKeySearch: (state, action) => {
      state.keySearch = action.payload;
    },
  },
});
