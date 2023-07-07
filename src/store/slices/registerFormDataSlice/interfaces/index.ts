export interface RegisterFormData {
    firstName: {
        value: string,
        isValidated: boolean
    },
    lastName: {
        value: string,
        isValidated: boolean
    },
    email: {
        value: string,
        isValidated: boolean
    },
    password: {
        value: string,
        isValidated: boolean
    },
    confirmPassword: { value: string, isValidated: boolean },
    termsAndPolicyAgreement: boolean,
    firstSubmit: boolean,
    showValidationMessage: boolean
}