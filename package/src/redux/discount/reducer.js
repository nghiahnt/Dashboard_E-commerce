import { createSlice } from "@reduxjs/toolkit";
import * as discountAction from "./action";

const handleDiscount = createSlice({
  name: "discount",
  initialState: {
    allDiscount: [],
    discountId: null,
    message: "",
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        discountAction.createDiscount.fulfilled,
        (state, action) => {
          state.message = action.payload.message;
        }
      )
      .addCase(
        discountAction.getAllDiscount.fulfilled,
        (state, action) => {
          state.allDiscount = action.payload.elements;
        }
      )
      .addCase(
        discountAction.getDiscountId.fulfilled,
        (state, action) => {
          state.discountId = action.payload.elements;
        }
      )
      .addCase(
        discountAction.updateDiscount.fulfilled,
        (state, action) => {
          state.message = action.payload.message;
        }
      )
      .addCase(
        discountAction.deleteDiscount.fulfilled,
        (state, action) => {
          state.message = action.payload.message;
        }
      );
  },
});

export const { discountActions } = handleDiscount.actions;
export default handleDiscount.reducer;
