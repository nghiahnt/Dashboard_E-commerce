import * as httpRequest from "../utils/httpRequest";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const discountTypeId = cookies.get("discountTypeId");

export const createDiscountType = async (data) => {
  try {
    const res = await httpRequest.post("discountType/createDiscountType", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDiscountType = async (data) => {
  try {
    const res = await httpRequest.get("discountType/getAllDiscountType");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscountTypeId = async (dicountTypeId) => {
  try {
    const res = await httpRequest.get(
      `discountType/getDiscountTypeId/${dicountTypeId}`
    );
    return res.elements;
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscountType = async (data) => {
  try {
    const res = await httpRequest.patch(
      `discountType/updateDiscountType/${discountTypeId}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDiscountType = async (discountTypeId) => {
  try {
    const res = await httpRequest.remove(
      `discountType/deleteDiscountType/${discountTypeId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
