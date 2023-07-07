export interface ResetPassFormData {
    email: string,
    code: string,
    password: {
        value: string,
        isValidated: boolean
    },
    confirmPassword: {
        value: string,
        isValidated: boolean
    },
    step: number,
    areFieldsFilled: boolean,
    firstSubmit: boolean,
}