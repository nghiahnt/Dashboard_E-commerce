import { createAsyncThunk } from "@reduxjs/toolkit";
import * as profileServices from "../../services/profileServices";

export const getAllProfile = createAsyncThunk("getAllProfile", async () => {
    const res = profileServices.getAllProfile();
    return res;
});

