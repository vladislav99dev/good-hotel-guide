import { configureStore } from "@reduxjs/toolkit";
import initialHotelDataSlice from "./slices/initialHotelDataSlice";
import hotelPageDataSlice from "./slices/hotelPageDataSlice";
import userDataSlice from "./slices/userDataSlice";
import registerFormDataSlice from "./slices/registerFormDataSlice/intex";
import loginFormDataSlice from "./slices/loginFormSlice";
import modalDataSlice from "./slices/modalDataSlice";
import resetPasswordFormDataSlice from "./slices/resetPasswordFormDataSlice";
import searchFormDataSlice from "./slices/dashboardSearchSlice";

const store = configureStore({
  reducer: {
    initialHotelData: initialHotelDataSlice.reducer,
    hotelPageData: hotelPageDataSlice.reducer,
    userDataSlice: userDataSlice.reducer,
    registerFormDataSlice: registerFormDataSlice.reducer,
    loginFormDataSlice: loginFormDataSlice.reducer,
    modalDataSlice: modalDataSlice.reducer,
    resetPasswordFormDataSlice: resetPasswordFormDataSlice.reducer,
    searchFormDataSlice: searchFormDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const initialHotelDataActions = initialHotelDataSlice.actions;
export const hotelPageDataActions = hotelPageDataSlice.actions;
export const userDataActions = userDataSlice.actions;
export const registerFormDataActions = registerFormDataSlice.actions;
export const loginFormDataActions = loginFormDataSlice.actions;
export const modalDataActions = modalDataSlice.actions;
export const resetPasswordFormDataActions = resetPasswordFormDataSlice.actions;
export const searchFormDataActions = searchFormDataSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
