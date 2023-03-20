import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const login = createAsyncThunk("user/login", async (data) => {
  const res = await customAxios.post("users/login", data);

  return res.data;
});

export const register = createAsyncThunk("user/register", async (data) => {
  const res = await customAxios.post("users/register", data);
  console.log(3, res);
  return res.data;
});

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data) => {
    const res = await customAxios.put("/users/" + data[1], data[0]);
    return res.data;
  }
);

export const getProfile = createAsyncThunk("user/getProfile", async (data) => {
  const res = await customAxios.get("/users/showMyProfile/" + data);
  return res.data;
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const res = await customAxios.get("admins");
  return res.data;
});
export const getUsersRequest = createAsyncThunk(
  "user/getUsersRequest",
  async () => {
    const res = await customAxios.get("admins/checkAsk");

    return res.data;
  }
);
export const getUsersRegister = createAsyncThunk(
  "user/getUsersRegister",
  async () => {
    const res = await customAxios.get("admins/AddUser");

    return res.data;
  }
);

export const requestProvider = createAsyncThunk(
  "user/getRequestProviders",
  async (data) => {
    const res = await customAxios.get("/users/userRequest/" + data);
    return data;
  }
);
export const acceptRequestProvider = createAsyncThunk(
  "user/getAcceptRequestProvider",
  async (data) => {
    const res = await customAxios.get("/admins/changeRole/" + data);
    return data;
  }
);
export const acceptUsersRegister = createAsyncThunk(
  "user/getAcceptUserRegister",
  async (data) => {
    const res = await customAxios.get("admins/changeCategory/" + data);
    return data;
  }
);
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (data) => {
    const res = await customAxios.put(
      "users/changePassword/" + data[1],
      data[0]
    );
    console.log(res.data, 999);
    return res.data;
  }
);
export const lockUser = createAsyncThunk("user/getLockUser", async (data) => {
  console.log(123, data);
  const res = await customAxios.get("admins/lock/" + data);
  return data;
});
