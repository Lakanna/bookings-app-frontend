import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export const fetchBusinesses = createAsyncThunk(
  "businesses/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/users");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
