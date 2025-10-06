import { createSlice } from "@reduxjs/toolkit";
import { fetchBusinesses } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const businessesSlice = createSlice({
  name: "businesses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.pending, handlePending)
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchBusinesses.rejected, handleRejected);
  },
});

export default businessesSlice.reducer;
