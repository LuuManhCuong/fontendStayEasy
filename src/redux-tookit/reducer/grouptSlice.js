import { createSlice } from "@reduxjs/toolkit";

export const grouptSlice = createSlice({
  name: "groupt",
  initialState: {
    isOpenLoginModal: false,
  },
  reducers: {
    openLoginForm: (state, action) => {
      state.isOpenLoginModal = !state.isOpenLoginModal;
    },
  },
});
