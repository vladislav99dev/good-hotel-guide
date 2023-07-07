export interface LoginFormData {
    email: {
        value: string,
        isValidated: boolean
    },
    password: {
        value: string,
        isValidated: boolean
    },
    rememberMe: boolean,
    validationMessage: {
        value: boolean,
        message: string
    }
}