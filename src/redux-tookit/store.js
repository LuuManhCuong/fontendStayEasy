import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducer/counterSlice";
import { dataExploreSlice } from "./reducer/dataExploreSlice";
import { dataHomeSlice } from "./reducer/dataHomeSlice";
import { dataDetailSlice } from "./reducer/dataDetailSlice";
import { keySearchSlice } from "./reducer/keySearchSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    dataExplore: dataExploreSlice.reducer,
    dataHome: dataHomeSlice.reducer,
    dataDetail: dataDetailSlice.reducer,
    keySearch: keySearchSlice.reducer,
  },
});

export default store;
