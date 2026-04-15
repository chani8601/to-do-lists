import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {
    username: "chavichani",
    password: "1234"
  },
  isLoggedIn: false
};

 const UserSlice = createSlice({//לשאול על אקספורט
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
  