import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../redux/Slice";
import religionsReducer from "../redux/ReligionSlice";
import qualificationsReducer from "../redux/QualificationSlice";
const store = configureStore({
  reducer: {
    cities: citiesReducer,
    religions: religionsReducer,
    qualifications: qualificationsReducer,
  },
});

export default store;
