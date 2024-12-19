import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [], // Starting with an empty array
  filteredLocations: [],
  newdata: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    // Action to set cities list
    setCities: (state, action) => {
      state.locations = action.payload;
    },
    // Action to add a new city
    addCity: (state, action) => {
      state.locations.push(action.payload); // Adds the new city to the array
      state.newdata = action.payload;
    },
    // Filter cities by provided criteria
    filterCities: (state, action) => {
      const { Country, State, CityName, Status } = action.payload;
      state.filteredLocations = state.locations.filter((location) => {
        return (
          (!Country ||
            location.Country.toLowerCase() === Country.toLowerCase()) &&
          (!State ||
            location.State.toLowerCase().includes(State.toLowerCase())) &&
          (!CityName ||
            location.cityName.toLowerCase().includes(CityName.toLowerCase())) &&
          (!Status || location.status.toLowerCase() === Status.toLowerCase())
        );
      });
    },
  },
});

export const { setCities, addCity, filterCities } = citiesSlice.actions;

export default citiesSlice.reducer;
