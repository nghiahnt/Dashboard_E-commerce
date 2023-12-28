import { createSlice } from "@reduxjs/toolkit";
import * as gameCardAction from "./action";

const handleGameCard = createSlice({
  name: "gameCard",
  initialState: {
    allGameCard: [],
    gameCard: null,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(gameCardAction.createGameCard.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(gameCardAction.getAllGameCard.fulfilled, (state, action) => {
        state.allGameCard = action.payload.elements;
      })
      .addCase(gameCardAction.getGameCardId.fulfilled, (state, action) => {
        state.gameCard = action.payload.elements;
      })
      .addCase(gameCardAction.updateGameCard.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(gameCardAction.deleteGameCard.fulfilled, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const { gameCardActions } = handleGameCard.actions;
export default handleGameCard.reducer;
