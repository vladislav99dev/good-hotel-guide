import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInitialHotelDataService } from "./services";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { InitialStateInteface, HotelsData, GetInitialDataFunctionParameters } from "./interfaces";


export const getInitialHotelData = createAsyncThunk<
  HotelsData,
  GetInitialDataFunctionParameters,
  {
    rejectValue: AxiosError;
  }
>("type/getInitialHotelData", async (data: GetInitialDataFunctionParameters, { rejectWithValue }) => {
  const response = await getInitialHotelDataService(data);
  if (response instanceof AxiosError) {
    return rejectWithValue(response);
  } else {
    return response;
  }
});

const initialState = {
  hotels: [],
  loading: false,
  pageNumbers: 0,
  error: null,
} as InitialStateInteface;

const initialHotelDataSlice = createSlice({
  name: "initialHotelData",
  initialState,
  reducers: {
    clearHotelsData: (state: InitialStateInteface) => state = { ...initialState }
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialHotelData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInitialHotelData.fulfilled, (state, action) => {
      state.loading = false;
      state.hotels = action.payload.hotels;
      state.pageNumbers = Math.ceil(action.payload.hotelsCount / 9);
    });
    builder.addCase(getInitialHotelData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default initialHotelDataSlice;
