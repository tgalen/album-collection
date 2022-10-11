import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recordService from "./recordService";

const initialState = {
  collectedRecords: [],
  wishlistedRecords: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const addRecordToCollection = createAsyncThunk(
  "record/addToCollection",
  async (recordData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recordService.addRecordToCollection(recordData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecordToCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRecordToCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collectedRecords.push(action.payload);
      })
      .addCase(addRecordToCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;
