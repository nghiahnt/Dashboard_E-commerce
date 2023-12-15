import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

const httpRequest = axios.create({
  baseURL: "https://ecommerce-camping.onrender.com/api/",
});
const tokenRequest = axios.create({
  baseURL: "https://ecommerce-camping.onrender.com/api/",
  headers: { Authorization: accessToken },
});

export const get = async (path, option = {}) => {
  const response = await httpRequest.get(path, option);
  return response.data;
};

export const post = async (path, data = {}) => {
  const response = await tokenRequest.post(path, data);
  return response.data;
};

export const remove = async (path, data = {}) => {
  const response = await tokenRequest.delete(path, data);
  return response.data;
};

export const patch = async (path, data = {}) => {
  const response = await tokenRequest.patch(path, data);
  return response.data;
}

export const getWithToken = async (path, data={}) => {
  const response = await tokenRequest.get(path, data);
  return response.data;
}
