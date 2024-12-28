import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  qualifications: [],
  filteredqualifications: [],
  newqualifications: [],
};
console.log(initialState.qualifications);

const qualificationsSlice = createSlice({
  name: "qualifications",
  initialState,
  reducers: {
    setqualifications: (state, action) => {
      state.qualifications = action.payload;
    },

    addqualifications: (state, action) => {
      const newqualification = {
        ...action.payload,
        qualifications: action.payload.qualifications,
      };
      state.qualifications.push(newqualification);
      state.newqualifications = newqualification;
      console.log(state.qualifications);
    },

    updatedqualifications: (state, action) => {
      const updatedqualifications = action.payload;
      const index = state.qualifications.findIndex(
        (qual) => qual.qualificationId === updatedqualifications.qualificationId
      );
      if (index !== -1) {
        state.qualifications[index] = {
          ...state.qualifications[index],
          ...updatedqualifications,
        };
      }
    },

    filterqualifications: (state, action) => {
      //console.log(state.qualifications);

      const { Location, DegreeName, DegreeShortName, Description, Status } =
        action.payload;
      if (state.qualifications.length > 0) {
        state.filteredqualifications = state.qualifications.filter(
          (qualification) => {
            return (
              (!Location ||
                qualification.Location?.toLowerCase() ===
                  Location.toLowerCase()) &&
              (!DegreeName ||
                qualification.DegreeName?.toLowerCase() ===
                  DegreeName.toLowerCase()) &&
              (!DegreeShortName ||
                qualification.DegreeShortName?.toLowerCase() ===
                  DegreeShortName.toLowerCase()) &&
              (!Description ||
                qualification.Description?.toLowerCase() ===
                  Description.toLowerCase()) &&
              (!Status ||
                qualification.Status?.toLowerCase() === Status.toLowerCase())
            );
          }
        );
      } else {
        state.filteredqualifications = [];
      }
      //console.log("Filtering with:", action.payload);
    },
  },
});

export const {
  setqualifications,
  addqualifications,
  filterqualifications,
  updatedqualifications,
} = qualificationsSlice.actions;

export default qualificationsSlice.reducer;
