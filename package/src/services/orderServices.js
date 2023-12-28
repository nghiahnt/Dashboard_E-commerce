import * as httpRequest from "../utils/httpRequest";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const orderId = cookies.get('orderId');

export const getAllOrder = async () => {
  try {
    const res = await httpRequest.getWithToken("order/getAllOrder");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const confirmOrder = async (body) => {
  try {
    const res = await httpRequest.patch(`order/confirmOrder/${orderId}`, body);
    return res;
  } catch (error) {
    console.log(error);
  }
};
