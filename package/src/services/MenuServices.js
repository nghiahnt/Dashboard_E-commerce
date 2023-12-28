import * as httpRequest from "../utils/httpRequest";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const menuId = cookies.get("menuId");

export const addMenu = async (data) => {
  try {
    const res = await httpRequest.post("menu/createMenu", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMenu = async () => {
    try {
        const res = await httpRequest.get("menu/getAllMenu");
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getMenuId = async (id) => {
    try {
        const res = await httpRequest.get(`menu/getMenuId/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateMenu = async (data) => {
    try {
        const res = await httpRequest.patch(`menu/updateMenu/${menuId}`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteMenu = async (id) => {
    try {
        const res = await httpRequest.remove(`menu/deleteMenu/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}
