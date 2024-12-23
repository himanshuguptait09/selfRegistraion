import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../redux/Slice";
import religionsReducer from "../redux/ReligionSlice";
const store = configureStore({
  reducer: {
    cities: citiesReducer,
    religions: religionsReducer,
  },
});

export default store;
