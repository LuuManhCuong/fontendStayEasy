import { createSlice } from "@reduxjs/toolkit";

export const keySearchSlice = createSlice({
  name: "keySearch",
  initialState: {
    keySearch: "",
  },
  reducers: {
    setKeySearch: (state, action) => {
      console.log("key search reducer: ", action.payload);
      state.keySearch = action.payload;
    },
  },
});
