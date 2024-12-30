import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    {
      qualificationId: 1,
      Location: "Referred",
      DegreeName: "Christianity",
      DegreeShortName: "Chr",
      Description: "A major religion",
      Status: "Active",
    },
    {
      qualificationId: 2,
      Location: "Transfer",
      DegreeName: "Islam",
      DegreeShortName: "Isl",
      Description: "A major world religion",
      Status: "Active",
    },
    {
      qualificationId: 3,
      Location: "Semi",
      DegreeName: "Hinduism",
      DegreeShortName: "Hin",
      Description: "Ancient religion",
      Status: "Inactive",
    },
  ],
  filteredusers: [],
  //  newusers: [],
};
console.log(initialState.users);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setusers: (state, action) => {
      state.users = action.payload;
    },

    //addusers: (state, action) => {
    //  const newqualification = {
    //    ...action.payload,
    //    users: action.payload.users,
    //  };
    //  state.users.push(newqualification);
    //  state.newusers = newqualification;
    //  console.log(state.users);
    //},

    //updatedusers: (state, action) => {
    //  const updatedusers = action.payload;
    //  const index = state.users.findIndex(
    //    (qual) => qual.qualificationId === updatedusers.qualificationId
    //  );
    //  if (index !== -1) {
    //    state.users[index] = {
    //      ...state.users[index],
    //      ...updatedusers,
    //    };
    //  }
    //},

    filterusers: (state, action) => {
      //console.log(state.users);

      const { Location, DegreeName, DegreeShortName, Description, Status } =
        action.payload;
      if (state.users.length > 0) {
        state.filteredusers = state.users.filter((qualification) => {
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
        });
      } else {
        state.filteredusers = [];
      }
      //console.log("Filtering with:", action.payload);
    },
  },
});

export const {
  setusers,
  //  addusers,
  filterusers,
  //  updatedusers,
} = usersSlice.actions;

export default usersSlice.reducer;
