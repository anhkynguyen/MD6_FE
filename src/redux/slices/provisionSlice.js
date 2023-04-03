import { createSlice } from "@reduxjs/toolkit";
import { getProvision } from "../../service/provisionService";
import { getPersonalByIdUser } from "../../service/personalService";
const initialState = {
  provisions: [],
  provision: [],
};
const provisionSlice = createSlice({
  name: "provision",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvision.fulfilled, (state, action) => {
      state.provisions = action.payload;
    });
    builder.addCase(getPersonalByIdUser.fulfilled, (state, action) => {
      state.provisions = action.payload;
    });
  },
});
export default provisionSlice.reducer;
