import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProviders = createAsyncThunk("post/getPosts", async (page) => {
  const res = await customAxios.get("post?page=" + page);
  return res.data;
});
export const findByIdProvider = createAsyncThunk(
  "post/findByIdUser",
  async (data) => {
    console.log(data);
    const res = await customAxios.get("post/findPostByIdUSer/" + data);
    console.log(res.data, 444);
    return res.data;
  }
);

export const addProvider = createAsyncThunk("post/addPost", async (data) => {
  const res = await customAxios.post("/post/add", data);

  return res.data;
});
export const removeProvider = createAsyncThunk(
  "post/removePost",
  async (data) => {
    const res = await customAxios.delete("/post/remove/" + data);
    return data;
  }
);

export const editProvider = createAsyncThunk("post/editPost", async (data) => {
  console.log(data, 33333);
  await customAxios.put("post/edit/" + data[1], data[0]);
  const res = await customAxios.get("post");
  return res.data;
});
export const getTopProviders = createAsyncThunk(
  "post/getAllPost2",
  async () => {
    try {
      const res = await customAxios.get("/post/getAllPost2");
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
