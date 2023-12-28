import * as httpRequest from "../utils/httpRequest";

export const getAllProfile = async () => {
    try {
        const res = await httpRequest.getWithToken("profile/getAllProfile");
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getProfileId = async (profileId) => {
  try {
    const res = await httpRequest.getWithToken(`profile/getProfileId/${profileId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = async (profileId) => {
    try {
        const res = await httpRequest.remove(`profile/deleteProfile/${profileId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};