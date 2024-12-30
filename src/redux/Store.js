import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../redux/Slice";
import religionsReducer from "../redux/ReligionSlice";
import qualificationsReducer from "../redux/QualificationSlice";
import usersRedcucer from "../redux/usersSlice";
const store = configureStore({
  reducer: {
    cities: citiesReducer,
    religions: religionsReducer,
    qualifications: qualificationsReducer,
    users: usersRedcucer,
  },
});

export default store;
