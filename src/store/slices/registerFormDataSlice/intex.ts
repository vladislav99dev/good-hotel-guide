import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RegisterFormData } from "./interfaces"


const initialState: RegisterFormData = {
    firstName: { value: "", isValidated: false },
    lastName: { value: "", isValidated: false },
    email: { value: "", isValidated: false },
    password: { value: "", isValidated: false },
    confirmPassword: { value: "", isValidated: false },
    termsAndPolicyAgreement: false,
    firstSubmit: false,
    showValidationMessage: false
}


const registerFormDataSlice = createSlice({
    name: "initialRegisterFormData",
    initialState,
    reducers: {
        resetFormData: (state: RegisterFormData) => state = { ...initialState },
        showValidationMessage: (state: RegisterFormData, action: { payload: boolean }) => state = { ...state, showValidationMessage: action.payload },
        setFirstSubmit: (state: RegisterFormData, action: { payload: boolean }) => state = { ...state, firstSubmit: action.payload },
        formDataReducer: (state: RegisterFormData,
            action: { payload: { elementName: string, value: string } }) => {

            if (action.payload.elementName === "FIRSTNAME") {
                return {
                    ...state,
                    firstName: {
                        value: action.payload.value,
                        isValidated: action.payload.value.match(
                            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
                        ) &&
                            action.payload.value.trim().length !== 0 &&
                            action.payload.value.length > 1 &&
                            action.payload.value.length < 20
                            ? true
                            : false,
                    }
                }
            }
            if (action.payload.elementName === "LASTNAME") {
                return {
                    ...state,
                    lastName: {
                        value: action.payload.value,
                        isValidated:
                            action.payload.value.match(
                                /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
                            ) &&
                                action.payload.value.trim().length !== 0 &&
                                action.payload.value.length > 1 &&
                                action.payload.value.length < 20
                                ? true
                                : false,
                    },
                }
            }
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
                        isValidated: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(action.payload.value)
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
            if (action.payload.elementName === "TERMSANDPOLICYAGREEMENT") {
                return {
                    ...state,
                    termsAndPolicyAgreement: !state.termsAndPolicyAgreement,
                }
            }
            return initialState
        }
    }
})

export default registerFormDataSlice
