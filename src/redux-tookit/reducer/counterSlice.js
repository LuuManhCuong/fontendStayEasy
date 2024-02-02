import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increase: (state, action) => {
      state.value += 1;
    },
    descrease: (state, action) => {
      state.value -= 1;
    },
  },
});
