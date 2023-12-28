import * as httpRequest from "../utils/httpRequest";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const gameCardId = cookies.get("gameCardId");

export const createGameCard = async (data) => {
  try {
    const res = await httpRequest.post("gameCard/createGameCard", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllGameCard = async () => {
  try {
    const res = await httpRequest.get("gameCard/getAllGameCard");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getGameCardId = async (gameCardId) => {
  try {
    const res = await httpRequest.get(`gameCard/getGameCardId/${gameCardId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateGameCard = async (data) => {
  try {
    const res = await httpRequest.patch(
      `gameCard/updateGameCard/${gameCardId}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGameCard = async (gameCardId) => {
  try {
    const res = await httpRequest.remove(
      `gameCard/deleteGameCard/${gameCardId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
