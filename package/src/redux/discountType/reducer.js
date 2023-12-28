import { createSlice } from "@reduxjs/toolkit";
import * as discountTypeAction from "./action";

const handleDiscountType = createSlice({
  name: "discountType",
  initialState: {
    allDiscountType: [],
    discountTypeId: null,
    message: "",
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        discountTypeAction.createDiscountType.fulfilled,
        (state, action) => {
          state.message = action.payload;
        }
      )
      .addCase(
        discountTypeAction.getAllDiscountType.fulfilled,
        (state, action) => {
          state.allDiscountType = action.payload.elements;
        }
      )
      .addCase(
        discountTypeAction.getDiscountTypeId.fulfilled,
        (state, action) => {
          state.discountTypeId = action.payload.elements;
        }
      )
      .addCase(
        discountTypeAction.updateDiscountType.fulfilled,
        (state, action) => {
          state.message = action.payload.message;
        }
      )
      .addCase(
        discountTypeAction.deleteDiscountType.fulfilled,
        (state, action) => {
          state.message = action.payload.message;
        }
      );
  },
});

export const { discountTypeActions } = handleDiscountType.actions;
export default handleDiscountType.reducer;
