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
  acceptUsersRegister,
  getUsersRegister,
  lockUser,
  getSellerProfile,
  changeStatus,
  changeSellerToVip,
  getAddVip,
  showVip,
  userAskVip,
} from "../../service/userService";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
  user: [],
  users: [],
  vips: [],
  usersRequest: [],
  usersRegister: [],
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
      state.user = action.payload;
    });
    builder.addCase(acceptRequestProvider.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUsersRegister.fulfilled, (state, action) => {
    
      state.usersRegister = action.payload;
    });
    builder.addCase(acceptUsersRegister.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(lockUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getSellerProfile.fulfilled, (state, action) => {
      state.profile = action.payload[0];
    });
    builder.addCase(changeSellerToVip.fulfilled, (state, action) => {
      state.vips = action.payload;
    });
    builder.addCase(getAddVip.fulfilled, (state, action) => {
      state.vips = action.payload;
    });
    builder.addCase(showVip.fulfilled, (state, action) => {
      state.vips = action.payload;
    });
    builder.addCase(userAskVip.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
