import { createSlice } from "@reduxjs/toolkit";
import { addPersonal } from "../../service/personalService";

const initialState = {
  personals: [],
  personal: [],
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPersonal.fulfilled, (state, action) => {
      state.personals.push(action.payload);
    });
  },
});
export default personalSlice.reducer;
