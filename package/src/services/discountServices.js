import * as httpRequest from "../utils/httpRequest";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const discountId = cookies.get("discountId");
 
export const createDiscount = async (data) => {
  try {
    const res = await httpRequest.post("discounts/createDiscount", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDiscount = async () => {
  try {
    const res = await httpRequest.get("discounts/getAllDiscount");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscountId = async (id) => {
  try {
    const res = await httpRequest.get(`discounts/getDiscountId/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscount = async (data) => {
  try {
    const res = await httpRequest.patch(`discounts/updateDiscount/${discountId}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDiscount = async (id) => {
  try {
    const res = await httpRequest.remove(`discounts/deleteDiscount/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};


