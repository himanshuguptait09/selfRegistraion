import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  locations: [],
  filteredLocations: [],
  newdata: [],
};
const ReligionSlice = createSlice({
  name: "religion",
  initialState,
  reducers: {
    setReligion: (state, action) => {
      state.locations = action.payload;
    },

    addReligion: (state, action) => {
      const newReligion = {
        ...action.payload,
        Religion: action.payload.Religion,
      };
      state.locations.push(newReligion);
      state.newdata = newCity;
    },

    updatedReligion: (state, action) => {
      const updatedReligion = action.payload;
      const index = state.locations.findIndex(
        (loc) => loc.locationId === updatedReligion.locationId
      );
      if (index !== -1) {
        state.locations[index].ReligionName = updatedReligion.ReligionName;
        state.locations[index] = updatedReligion;
      }
    },

    filterReligion: (state, action) => {
      const { Location, Religion, Status } = action.payload;
      state.filteredLocations = state.locations.filter((location) => {
        return (
          (!Location ||
            location.Country.toLowerCase() === Country.toLowerCase()) &&
          (!Religion ||
            location.State.toLowerCase().includes(State.toLowerCase())) &&
          (!Status || location.Status.toLowerCase() === Status.toLowerCase())
        );
      });
    },
  },
});
export const { setReligion, addReligion, updatedReligion } =
  ReligionSlice.actions;
export default ReligionSlice.reducer;
