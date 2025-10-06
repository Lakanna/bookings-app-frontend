import { createSlice } from "@reduxjs/toolkit";
import {
  createBooking,
  deleteBooking,
  editBooking,
  getAllBookings,
} from "./operations.js";

// const handlePending = (state) => {
//   state.loading = true;
// };

const handleRejected = (state, action) => {
  //   state.loading = false;
  state.error = action.payload;
};

const initialState = {
  items: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(createBooking.rejected, handleRejected)
      .addCase(createBooking.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(editBooking.fulfilled, (state, action) => {
        const updatedBooking = action.payload;
        console.log(updatedBooking, "updatedBooking");
        const index = state.items.findIndex(
          (b) => b._id === updatedBooking._id
        );
        if (index !== -1) {
          state.items[index] = updatedBooking;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
