import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  collectedRecords: [],
  wishlistedRecords: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;
