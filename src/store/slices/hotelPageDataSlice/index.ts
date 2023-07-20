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
  reducers: {
    hotelAddressDataReducer: (state: InitialStateIHotelPage, action: { payload: { elementName: string, value: string } }) => {
      return state = {
        ...state,
        hotel: [
          {
            ...state.hotel[0],
            addressGroup: {
              ...state.hotel[0].addressGroup,
              [action.payload.elementName]: action.payload.value
            }
          }
        ]

      }
    },
    hotelContactDetailsReducer: (state: InitialStateIHotelPage, action: { payload: { elementName: string, value: string } }) => {

      if (action.payload.elementName === "displayEmail") {
        return state = {
          ...state,
          hotel: [
            {
              ...state.hotel[0],
              contactGroup: {
                ...state.hotel[0].contactGroup,
                displayEmail: !state.hotel[0].contactGroup.displayEmail
              }
            }
          ]
        }
      } else {
        return state = {
          ...state,
          hotel: [
            {
              ...state.hotel[0],
              contactGroup: {
                ...state.hotel[0].contactGroup,
                [action.payload.elementName]: action.payload.value
              }
            }
          ]
        }

      }
    },
    hotelDisplayOptionsReducer: (state: InitialStateIHotelPage, action: { payload: { elementName: string, value: string } }) => {
      let value: boolean = false
      switch (action.payload.elementName) {
        case "paid":
          value = !state.hotel[0].displayOptions.paid
          break;
        case "inGuide":
          value = !state.hotel[0].displayOptions.inGuide
          break;
        case "shortlist":
          value = !state.hotel[0].displayOptions.shortlist
          break;
        case "extended":
          value = !state.hotel[0].displayOptions.extended
          break;
        case "omitted":
          value = !state.hotel[0].displayOptions.omitted
          break;
        default:
          break;
      }
      return state = {
        ...state,
        hotel: [
          {
            ...state.hotel[0],
            displayOptions: {
              ...state.hotel[0].displayOptions,
              [action.payload.elementName]: value
            }
          }
        ]

      }
    },
    hotelManagementReducer: (state: InitialStateIHotelPage, action: { payload: { elementName: string, value: string } }) => {
      return state = {
        ...state,
        hotel: [
          {
            ...state.hotel[0],
            management: {
              ...state.hotel[0].management,
              [action.payload.elementName]: action.payload.value
            }
          }
        ]

      }
    },
    hotelInformationReducer: (state: InitialStateIHotelPage, action: { payload: { elementName: string, value: string | [] } }) => {
      return state = {
        ...state,
        hotel: [
          {
            ...state.hotel[0],
            hotelInformation: {
              ...state.hotel[0].hotelInformation,
              [action.payload.elementName]: action.payload.value
            }
          }
        ]
      }
    },
    hotelReviewTextAndMediaReducer: (state: InitialStateIHotelPage, action: { payload: string[] }) => {
      const updatedHotel = state.hotel.map((hotelItem, hotelIndex) => {
        const updatedReviewTextAndMedia = {
          ...hotelItem.reviewTextAndMedia,
          reviewFull: action.payload.map((reviewText) => ({
            _key: "58a5c3322e132",
            style: "normal",
            markDefs: [],
            children: [
              {
                marks: [],
                _type: "span",
                text: reviewText,
                _key: "c37f47e9ad13e",
              }
            ],
            _type: "block",
          }))
        }
        return {
          ...hotelItem,
          reviewTextAndMedia: updatedReviewTextAndMedia
        };
      })
      return {
        ...state,
        hotel: updatedHotel
      };
    }
  },
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
