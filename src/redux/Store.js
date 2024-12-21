import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../redux/Slice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

export default store;
