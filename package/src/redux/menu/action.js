import { createAsyncThunk } from "@reduxjs/toolkit";
import * as menuServices from "../../services/MenuServices";

export const createMenu = createAsyncThunk("createMenu", async (data) => {
  const res = await menuServices.addMenu(data);
  return res;
});

export const getAllMenu = createAsyncThunk("getAllMenu", async () => {
  const res = await menuServices.getAllMenu();
  return res;
});

export const getMenuId = createAsyncThunk("getMenuId", async (id) => {
  const res = await menuServices.getMenuId(id);
  return res;
});

export const updateMenu = createAsyncThunk("updateMenu", async (data) => {
  const res = await menuServices.updateMenu(data);
  return res;
});

export const deleteMenu = createAsyncThunk("deleteMenu", async (id) => {
  const res = await menuServices.deleteMenu(id);
  return res;
});
