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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data) => {
    const res = await customAxios.put(
      "/users/change-password/" + data[1],
      data[0]
    );
    return res.data;
  }
);
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const res = await customAxios.get("admins");
  return res.data;
});
export const getUsersRequest = createAsyncThunk(
  "user/getUsersRequest",
  async () => {
    const res = await customAxios.get("admins/checkAsk");
    console.log(333, res);
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
    console.log(11111, data);
    const res = await customAxios.get("/admins/changeRole/" + data);
    return data;
  }
);
