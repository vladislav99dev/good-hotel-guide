import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateIHotelPage, Hotel } from "./interfaces";
import { fetchHotelDataService } from "./services";
import { AxiosError } from "axios";

export const checkForHotelData = createAsyncThunk<
  Hotel[],
  string,
  {
    rejectValue: AxiosError;
  }
>("type/checkForHotelData", async (id: string, { rejectWithValue }) => {
  const response = await fetchHotelDataService(id);
  if (response instanceof AxiosError) {
    return rejectWithValue(response);
  } else {
    return response as Hotel[];
  }
});

const initialState = {
  hotel: [],
  loading: false,
  error: null,
  hasDraft: false,
} as InitialStateIHotelPage;

const hotelPageDataSlice = createSlice({
  name: "hotelPageData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkForHotelData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkForHotelData.fulfilled, (state, action) => {
      if (action.payload.length !== 0) {
        const hasDraft = action.payload[0]._id.includes("drafts");
        state.hasDraft = hasDraft;
      }
      state.loading = false;
      state.hotel = action.payload;
    });
    builder.addCase(checkForHotelData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default hotelPageDataSlice;
