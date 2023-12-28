import * as menuAction from "./action";
import { createSlice } from "@reduxjs/toolkit";

const handleMenu = createSlice({
  name: "menu",
  initialState: {
    allMenu: [],
    menu: null,
    message: "",
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(menuAction.createMenu.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(menuAction.getAllMenu.fulfilled, (state, action) => {
        state.allMenu = action.payload.elements;
      })
      .addCase(menuAction.deleteMenu.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(menuAction.getMenuId.fulfilled, (state, action) => {
        state.menu = action.payload.elements;
      })
  },
});

export const { menuActions } = handleMenu.actions;
export default handleMenu.reducer;
