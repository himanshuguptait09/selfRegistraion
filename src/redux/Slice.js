import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locations: [],
  filteredLocations: [],
  newdata: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.locations = action.payload;
    },

    addCity: (state, action) => {
      const newCity = {
        ...action.payload,
        cityName: action.payload.CityName,
      };
      state.locations.push(newCity);
      state.newdata = newCity;
    },

    updatedcity: (state, action) => {
      const updatedCity = action.payload;
      const index = state.locations.findIndex(
        (loc) => loc.locationId === updatedCity.locationId
      );
      if (index !== -1) {
        // Use consistent property naming: cityName
        state.locations[index].cityName = updatedCity.cityName;
        state.locations[index] = updatedCity;
      }
    },

    filterCities: (state, action) => {
      const { Country, State, cityName, Status } = action.payload;
      state.filteredLocations = state.locations.filter((location) => {
        return (
          (!Country || location.Country.toLowerCase() === Country.toLowerCase()) &&
          (!State || location.State.toLowerCase().includes(State.toLowerCase())) &&
          (!cityName || location.cityName.toLowerCase().includes(cityName.toLowerCase())) &&
          (!Status || location.Status.toLowerCase() === Status.toLowerCase())
        );
      });
    }
    
  },
});

export const { setCities, addCity, filterCities, updatedcity } =
  citiesSlice.actions;

export default citiesSlice.reducer;
