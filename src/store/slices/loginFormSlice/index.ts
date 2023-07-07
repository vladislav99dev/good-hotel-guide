import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { LoginFormData } from "./interfaces"

const initialState: LoginFormData = {
    email: {
        value: "",
        isValidated: false
    },
    password: {
        value: "",
        isValidated: false
    },
    rememberMe: false,
    validationMessage: {
        value: false,
        message: ""
    }
}


const loginFormDataSlice = createSlice({
    name: "initialLoginFormData",
    initialState,
    reducers: {
        resetFormData: (state: LoginFormData) => state = { ...initialState },

        setValidationMessage: (state: LoginFormData, action: { payload: { value: boolean, message: string } }) =>
            state = { ...state, validationMessage: { value: action.payload.value, message: action.payload.message } },

        formDataReducer: (state: LoginFormData,
            action: { type: string, payload: { elementName: string, value: string } }) => {
            if (action.payload.elementName === "EMAIL") {
                return {
                    ...state,
                    email: {
                        value: action.payload.value,
                        isValidated:
                            action.payload.value.match(
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            ) && action.payload.value.trim().length !== 0
                                ? true
                                : false,
                    },
                }
            }
            if (action.payload.elementName === "PASSWORD") {
                return {
                    ...state,
                    password: {
                        value: action.payload.value,
                        isValidated: /^[\S]+.*[\S]+$/.test(action.payload.value)
                    },
                }
            }
            if (action.payload.elementName === "REMEMBERME") {
                return {
                    ...state, rememberMe: !state.rememberMe
                }
            }
        },
        
        toggleRememberMe: (state: LoginFormData) => state = { ...state, rememberMe: !state.rememberMe }
    }
})

export default loginFormDataSlice