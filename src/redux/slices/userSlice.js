import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  editProfile,
  getProfile,
  getUsersRequest,
  getUsers,
  login,
  register,
  requestProvider,
  acceptRequestProvider,
} from "../../service/userService";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  user: [],
  users: [],
  usersRequest: [],
  profile: [],
  checkPassword: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("access-token", action.payload.token);
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user.push(action.payload);
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("access-token", action.payload.token);
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.checkPassword = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      state.usersRequest = action.payload;
    });
    builder.addCase(requestProvider.fulfilled, (state, action) => {
      console.log(11, action.payload);
      state.user = action.payload;
    });
    builder.addCase(acceptRequestProvider.fulfilled, (state, action) => {
      console.log(1234, action.payload);
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
