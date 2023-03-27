import { createSlice } from "@reduxjs/toolkit";
import {
  addProvider,
  editProvider,
  findByIdProvider,
  getProviders,
  removeProvider,
  getTopProviders,
  searchProviderByName,
  searchProviderByGender,
} from "../../service/providerService";

const initialState = {
  posts: [],
  post: [],
  searchPost: [],
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(findByIdProvider.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(addProvider.fulfilled, (state, action) => {
      console.log(action.payload, 5);
      state.posts.push(action.payload);
    });
    builder.addCase(removeProvider.fulfilled, (state, action) => {
      state.posts.splice(action.payload);
    });
    builder.addCase(editProvider.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getTopProviders.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(searchProviderByName.fulfilled, (state, action) => {
      console.log(action.payload);
      state.searchPost = action.payload;
    });
    builder.addCase(searchProviderByGender.fulfilled, (state, action) => {
      state.searchPost = action.payload;
    });
  },
});
export default postSlice.reducer;
