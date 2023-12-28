import { createAsyncThunk } from "@reduxjs/toolkit";
import * as discountTypeServices from "../../services/discountTypeServices";

export const createDiscountType = createAsyncThunk(
  "createDiscountType",
  async (data) => {
    const res = await discountTypeServices.createDiscountType(data);
    return res;
  }
);

export const getAllDiscountType = createAsyncThunk(
  "getAllDiscountType",
  async () => {
    const res = await discountTypeServices.getAllDiscountType();
    return res;
  }
);

export const getDiscountTypeId = createAsyncThunk(
  "getDiscountTypeId",
  async (id) => {
    const res = await discountTypeServices.getDiscountTypeId(id);
    return res;
  }
);

export const updateDiscountType = createAsyncThunk(
  "updateDiscountType",
  async (data) => {
    const res = await discountTypeServices.updateDiscountType(data);
    return res;
  }
);

export const deleteDiscountType = createAsyncThunk(
  "deleteDiscountType",
  async (id) => {
    const res = await discountTypeServices.deleteDiscountType(id);
    return res;
  }
);
