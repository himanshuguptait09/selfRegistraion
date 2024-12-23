import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  religions: [],
  filteredReligions: [],
  newReligion: [],
};
console.log(initialState.religions);

const religionsSlice = createSlice({
  name: "religions",
  initialState,
  reducers: {
    setReligions: (state, action) => {
      state.religions = action.payload;
    },

    addReligion: (state, action) => {
      const newReligion = {
        ...action.payload,
        Religion: action.payload.Religion,
      };
      state.religions.push(newReligion);
      state.newReligion = newReligion;
      console.log(state.religions);
    },

    updatedReligion: (state, action) => {
      const updatedReligion = action.payload;
      const index = state.religions.findIndex(
        (rel) => rel.religionId === updatedReligion.religionId
      );
      if (index !== -1) {
        state.religions[index].ReligionName = updatedReligion.ReligionName;
        state.religions[index] = updatedReligion;
      }
    },

    filterReligion: (state, action) => {
      console.log(state.religions);

      const { Location, Religion, Status } = action.payload;
      state.filteredReligions = state.religions.filter((religion) => {
        return (
          (!Location ||
            religion.Location?.toLowerCase() === Location.toLowerCase()) &&
          (!Religion ||
            religion.Religion?.toLowerCase() === Religion.toLowerCase()) &&
          (!Status || religion?.Status.toLowerCase() === Status.toLowerCase())
        );
      });
      //console.log("Filtering with:", action.payload);
    },
  },
});

export const { setReligions, addReligion, filterReligion, updatedReligion } =
  religionsSlice.actions;

export default religionsSlice.reducer;
