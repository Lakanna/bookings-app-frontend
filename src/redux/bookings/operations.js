import { createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { axiosInstance } from "../../api/axios.js";

const notifyAddBooking = () => toast.success(`Booking successfully added`);
// const notifyDeleteBooking = () =>
//   toast.success(`Booking successfully deleted`);
// const notifyEditBooking = () =>
//   toast.success(`Booking successfully edited`);

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("bookings", credentials);
      notifyAddBooking();

      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "bookings/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("bookings");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId, thunkAPI) => {
    try {
      await axiosInstance.delete(`bookings/${bookingId}`);

      console.log(bookingId, "bookingId");
      return bookingId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBooking = createAsyncThunk(
  "bookings/editBooking",
  async ({ bookingId, startAt, endAt, notes }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(`/bookings/${bookingId}`, {
        startAt,
        endAt,
        notes,
      });
      //   notifyEditContact(name);
      return data.data;
    } catch (error) {
      toast.error(`${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
