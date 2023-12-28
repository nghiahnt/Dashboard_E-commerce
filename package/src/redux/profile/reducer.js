import { createSlice } from "@reduxjs/toolkit";
import * as profileAction from "./action";

const handleProfile = createSlice({
  name: "profile",
  initialState: {
    allProfile: [],
    profile: null,
    message: "",
    status: null,
  },
  extraReducers: (builder) => {
    builder.addCase(profileAction.getAllProfile.fulfilled, (state, action) => {
      state.allProfile = action.payload.elements;
    });
  },
});

export const { profileActions } = handleProfile.actions;
export default handleProfile.reducer;
