import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

const httpRequest = axios.create({
  baseURL: "https://ecommerce-camping.onrender.com/api/",
});
const tokenRequest = axios.create({
  baseURL: "https://ecommerce-camping.onrender.com/api/",
  headers: { Authorization: `Bearer ${accessToken}` },
});

// Function to refresh token
const refreshTokenFunction = async () => {
  try {
    const expiredToken = cookies.get("refreshToken");
    const res = await httpRequest.post("auth/refreshToken", {
      refreshToken: expiredToken,
    });
    const { accessToken, refreshToken } = res.data.status.elements;
    cookies.set("accessToken", accessToken);
    cookies.set("refreshToken", refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const get = async (path, option = {}) => {
  const response = await httpRequest.get(path, option);
  return response.data;
};

export const post = async (path, data = {}) => {
  try {
    const response = await tokenRequest.post(path, data);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    if (error.response) {
      try {
        await refreshTokenFunction();
        const response = await tokenRequest.post(path, data);
        return response.data;
      } catch (refreshError) {
        console.log(refreshError);
        return refreshError.response.data;
      }
    } else {
      console.log(error);
      return error.response.data;
    }
  }
};

export const remove = async (path, data = {}) => {
  try {
    const response = await tokenRequest.delete(path, data);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    if (error) {
      try {
        await refreshTokenFunction();
        const response = await tokenRequest.delete(path, data);
        return response.data;
      } catch (refreshError) {
        console.log(refreshError);
        return refreshError.response.data;
      }
    } else {
      console.log(error);
      return error.response.data;
    }
  }
};

export const patch = async (path, data = {}) => {
  try {
    const response = await tokenRequest.patch(path, data);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    try {
      await refreshTokenFunction();
      const response = await tokenRequest.patch(path, data);
      return response.data;
    } catch (refreshError) {
      console.log(refreshError);
      return refreshError.response.data;
    }
  }
};

export const getWithToken = async (path, data = {}) => {
  try {
    const response = await tokenRequest.get(path, data);
    return response.data;
  } catch (error) {
    try {
      await refreshTokenFunction();
      const response = await tokenRequest.get(path, data);
      return response.data;
    } catch (refreshError) {
      console.log(refreshError);
      return refreshError.response.data;
    }
  }
};
