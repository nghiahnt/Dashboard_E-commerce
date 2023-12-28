import { createAsyncThunk } from "@reduxjs/toolkit";
import * as gameCardServices from "../../services/gameCardServices";

export const createGameCard = createAsyncThunk(
  "createGameCard",
  async (data) => {
    const res = await gameCardServices.createGameCard(data);
    return res;
  }
);

export const getAllGameCard = createAsyncThunk("getAllGameCard", async () => {
  const res = await gameCardServices.getAllGameCard();
  return res;
});

export const getGameCardId = createAsyncThunk(
  "getGameCardId",
  async (gameCardId) => {
    const res = await gameCardServices.getGameCardId(gameCardId);
    return res;
  }
);

export const updateGameCard = createAsyncThunk(
  "updateGameCard",
  async (data) => {
    const res = await gameCardServices.updateGameCard(data);
    return res;
  }
);

export const deleteGameCard = createAsyncThunk(
  "deleteGameCard",
  async (gameCardId) => {
    const res = await gameCardServices.deleteGameCard(gameCardId);
    return res;
  }
);
