import { User } from "../../types/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
  isLoggedIn: false,
  userEntered: false,
};

export const authSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.isLoggedIn = true;
      state.userEntered = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.displayName = "";
      state.email = "";
      state.photoURL = "";
      state.uid = "";
      state.userEntered = false;
    },
  },
  extraReducers: () => {},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
