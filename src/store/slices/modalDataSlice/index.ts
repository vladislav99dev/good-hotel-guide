import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modal } from "./interfaces";

const initialState: Modal = {
    status: "none",
    headingMessage: "",
    descriptionMessage: "",
    useTimer: {
        value: false,
        path: ""
    }
}

const modalDataSlice = createSlice({
    name: "initialModalData",
    initialState,
    reducers: {
        resetModal: (state: Modal) => state = { ...initialState },
        setModal: (state: Modal, action: PayloadAction<Modal>) => state = { ...action.payload }
    }
})

export default modalDataSlice