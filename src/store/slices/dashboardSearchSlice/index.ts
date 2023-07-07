import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SearchForm } from "./interfaces/index"

let initialState: SearchForm = {
    hotelName: "",
    hotelStatus: "",
    editProgress: "",
    page: 1
}

const searchFormDataSlice = createSlice({
    name: "initialSearchData",
    initialState,
    reducers: {
        formDataReducer: (state: SearchForm, action: { payload: { elementName: string, value: string } }) => {
            if (action.payload.elementName === "HOTELNAME") return state = { ...state, hotelName: action.payload.value }

            if (action.payload.elementName === "HOTELSTATUS") return state = { ...state, hotelStatus: action.payload.value }

            if (action.payload.elementName === "EDITPROGRESS") return state = { ...state, editProgress: action.payload.value }

            if (action.payload.elementName === "PAGE") return state = { ...state, page: Number(action.payload.value) }
        },
        setAll: (state: SearchForm, action: { payload: SearchForm }) => state = { ...action.payload },
        resetFormData: (state: SearchForm) => state = { ...initialState },

    }
})

export default searchFormDataSlice