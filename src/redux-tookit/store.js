import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/counterSlice";
import { dataExploreSlice } from "./reducer/dataExploreSlice";
import { dataHomeSlice } from "./reducer/dataHomeSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    dataExplore: dataExploreSlice.reducer,
    dataHome: dataHomeSlice.reducer,
  },
});

export default store;
