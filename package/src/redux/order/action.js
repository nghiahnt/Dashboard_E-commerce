import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderServices from "../../services/orderServices";

export const getAllOrder = createAsyncThunk("getAllOrder", async () => {
  const res = await orderServices.getAllOrder();
  return res;
});

export const confirmOrder = createAsyncThunk("confirmOrder", async (body) => {
    const res = await orderServices.confirmOrder(body);
    return res;
});