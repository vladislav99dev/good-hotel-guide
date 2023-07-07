import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ResetPassFormData } from "./interfaces";

const initialState: ResetPassFormData = {
    email: "",
    code: "",
    password: {
        value: "",
        isValidated: false
    },
    confirmPassword: {
        value: "",
        isValidated: false
    },
    step: 1,
    areFieldsFilled: false,
    firstSubmit: false,
}


const resetPasswordFormDataSlice = createSlice({
    name: "initialResetPasswordFormData",
    initialState,
    reducers: {
        resetFormData: (state: ResetPassFormData) => state = { ...initialState },
        setIsFormFilled: (state: ResetPassFormData, action: { payload: boolean }) => state = { ...state, areFieldsFilled: action.payload },
        setFirstSubmit: (state: ResetPassFormData, action: { payload: boolean }) => state = { ...state, firstSubmit: action.payload },
        changeStep: (state: ResetPassFormData, action: { payload: number }) => state = { ...state, step: action.payload },
        formDataReducer: (state: ResetPassFormData,
            action: { payload: { elementName: string, value: string } }) => {
            const { email, code, password, confirmPassword } = { ...state }

            if (action.payload.elementName === "EMAIL") {
                return {
                    ...state,
                    email: action.payload.value
                }
            }
            if (action.payload.elementName === "CODE") {
                return {
                    ...state,
                    code: action.payload.value
                }
            }
            if (action.payload.elementName === "PASSWORD") {
                return {
                    ...state,
                    password: {
                        value: action.payload.value,
                        isValidated: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(action.payload.value)
                    },
                }
            }
            if (action.payload.elementName === "CONFIRMPASSWORD") {
                return {
                    ...state,
                    confirmPassword: {
                        value: action.payload.value,
                        isValidated: action.payload.value !== state.password.value ? false : true,
                    },
                }
            }
        }
    }
})


export default resetPasswordFormDataSlice;