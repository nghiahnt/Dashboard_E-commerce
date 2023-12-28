import { createAsyncThunk } from "@reduxjs/toolkit";
import * as discountServices from "../../services/discountServices";

export const createDiscount = createAsyncThunk(
  "createDiscount",
  async (data) => {
    const res = await discountServices.createDiscount(data);
    return res;
  }
);

export const getAllDiscount = createAsyncThunk(
  "getAllDiscount",
  async () => {
    const res = await discountServices.getAllDiscount();
    return res;
  }
);

export const getDiscountId = createAsyncThunk(
  "getDiscountId",
  async (id) => {
    const res = await discountServices.getDiscountId(id);
    return res;
  }
);

export const updateDiscount = createAsyncThunk(
  "updateDiscount",
  async (data) => {
    const res = await discountServices.updateDiscount(data);
    return res;
  }
);

export const deleteDiscount = createAsyncThunk(
  "deleteDiscount",
  async (id) => {
    const res = await discountServices.deleteDiscount(id);
    return res;
  }
);
