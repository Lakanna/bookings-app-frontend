import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../api/axios.js";

export const fetchBusinesses = createAsyncThunk(
  "businesses/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/users");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
