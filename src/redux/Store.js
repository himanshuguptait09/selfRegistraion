import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../redux/Slice";

// Create the Redux store and add the slice reducers
const store = configureStore({
  reducer: {
    cities: citiesReducer, // This adds the cities reducer to the store
  },
});

export default store;
