import * as orderAction from "./action";
import { createSlice } from "@reduxjs/toolkit";

const handleOrder = createSlice({
  name: "order",
  initialState: {
    orders: [],
    message: "",
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderAction.getAllOrder.fulfilled, (state, action) => {
        state.orders = action.payload.elements;
      })
      .addCase(orderAction.confirmOrder.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { orderActions } = handleOrder.actions;
export default handleOrder.reducer;
