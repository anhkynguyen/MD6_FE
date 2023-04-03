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
  countViewPost,
  showSixPostHaveMostViews,
  showTopMalesFemales,
  showTopTwelve,
} from "../../service/providerService";

const initialState = {
  posts: [],
  post: [],
  searchPost: [],
  sixPostHaveMostView: [],
  topMalesFemales: [],
  topTwelve: [],
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
      state.searchPost = action.payload;
    });
    builder.addCase(searchProviderByGender.fulfilled, (state, action) => {
      state.searchPost = action.payload;
    });
    builder.addCase(countViewPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(showSixPostHaveMostViews.fulfilled, (state, action) => {
      state.sixPostHaveMostView = action.payload;
    });
    builder.addCase(showTopMalesFemales.fulfilled, (state, action) => {
      state.topMalesFemales = action.payload;
    });
    builder.addCase(showTopTwelve.fulfilled, (state, action) => {
      console.log(action.payload,111);
      state.topTwelve = action.payload;
    });
  },
});
export default postSlice.reducer;
