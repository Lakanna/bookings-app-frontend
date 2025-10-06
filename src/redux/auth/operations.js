import { createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import {
  axiosInstance,
  clearAuthHeader,
  setAuthHeader,
} from "../../api/axios.js";

const notify = () => toast.error("Invalid email or password. Try again");

/*
 * POST @ /auth/register
 *
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("auth/register", credentials);
      setAuthHeader(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("auth/login", credentials);

      setAuthHeader(data.data.accessToken);
      return data;
    } catch (error) {
      notify();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    try {
      setAuthHeader(state.auth.token);
      const resp = await axiosInstance.get("/users/current");
      return resp.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return state.auth.token !== null;
    },
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch("/users/update", userData);

      toast.success("Successfully updated user information");

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
