import { createSlice } from "@reduxjs/toolkit";

export const keySearchSlice = createSlice({
  name: "keySearch",
  initialState: {
    page: "",
    keySearch: "",
  },
  reducers: {
    setKeySearch: (state, action) => {
      state.keySearch = action.payload;
    },
    setPageSearch: (state, action) => {
      state.page = action.payload;
    },
  },
});
