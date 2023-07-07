"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { registerFormDataActions, modalDataActions } from "@/store/store";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "@/UserPool";
import { PasswordIcon, EmailIcon } from "@/assets/icons/icons1"
import tempLogoImage from "@/assets/img/tempLogoImage.png"
import InputWrapper from "@/components/UI/inputWrapper";
import Modal from "@/components/UI/modal";
import validateEmailWithHotel from "@/utils/validateEmailWithHotel";
import { AuthGuard } from "@/HOC/routeGuard";

const Register = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const formData = useAppSelector(state => state.registerFormDataSlice);

    useEffect(() => {
        return () => {
            dispatch(registerFormDataActions.resetFormData())
            dispatch(modalDataActions.resetModal())
            dispatch(registerFormDataActions.showValidationMessage(false))
        };
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name.toUpperCase();
        const elementValue = e.target.value;

        dispatch(registerFormDataActions.formDataReducer({ elementName, value: elementValue }))
    };

    const handleSubmit = (e: React.FormEvent<EventTarget & HTMLFormElement>) => {
        e.preventDefault();

        dispatch(registerFormDataActions.setFirstSubmit(true))
        if (!formData.termsAndPolicyAgreement
            || !formData.firstName.value.length
            || !formData.lastName.value.length
            || !formData.email.value.length
            || !formData.password.value.length
            || !formData.confirmPassword.value.length
        ) {
            return dispatch(registerFormDataActions.showValidationMessage(true))
        } else {
            dispatch(registerFormDataActions.showValidationMessage(false))
        }


        validateEmailWithHotel(formData.email.value)
            .then(res => {
                if (res) {
                    const fullName = new CognitoUserAttribute({ Name: "name", Value: `${formData.firstName.value} ${formData.lastName.value}` })
                    const role = new CognitoUserAttribute({ Name: "custom:role", Value: `hotelManager` })

                    UserPool.signUp(formData.email.value, formData.password.value, [fullName, role], [], (err, data) => {
                        if (err) {
                            dispatch(modalDataActions.setModal({ status: "failed", descriptionMessage: err.message, headingMessage: "Failed", useTimer: { value: false } }))
                            setTimeout(() => {
                                dispatch(modalDataActions.resetModal())
                            }, 3000)
                        }
                        if (data) {
                            dispatch(modalDataActions.setModal({ status: "success", descriptionMessage: "A verification email have been sent,check your email", headingMessage: "Success", useTimer: { value: false } }))
                            setTimeout(() => {
                                dispatch(modalDataActions.resetModal())
                            }, 3000)
                        }
                    })
                    dispatch(registerFormDataActions.resetFormData())
                    dispatch(registerFormDataActions.setFirstSubmit(false))
                } else {
                    dispatch(modalDataActions.setModal({ status: "failed", descriptionMessage: "This email does not exist on any hotel", headingMessage: "Failed", useTimer: { value: false } }))
                    setTimeout(() => {
                        dispatch(modalDataActions.resetModal())
                    }, 3000)
                }
            })
    };

    return (
        <section className="flex relative">
            <Modal />
            <div className="w-[70%] px-52 py-32">
                <div className="w-[80%] mx-auto mb-14 flex justify-center">
                    <Image src={tempLogoImage} alt="logo" placeholder="blur" />
                </div>
                <div className="flex flex-col gap-y-4 mb-28">
                    <h3 className="text-center Gill-Sans-Nova-SemiBold text-4xl">Register</h3>
                    <p className="text-center Gibson-Light">Already have an account? <Link className="underline" href={"/login"}>Log In.</Link></p>
                </div>
                <form className="relative z-10" onSubmit={handleSubmit}>
                    <div className={`Gibson-Light text-center absolute top-2 left-1/2 translate-x-[-50%] -z-10 ${formData.showValidationMessage && '!-top-12'}  text-red-500`}>All fields are required!</div>
                    <div className=" flex flex-col gap-y-6 bg-white">
                        <div className="flex justify-center gap-x-6">
                            <InputWrapper
                                wrapperStyles="w-1/2"
                                labelProps={{ htmlFor: "firstName", text: "First Name" }}
                                inputProps={{
                                    onChangeHandler: onChangeHandler, type: "text", id: "firstName", name: "firstName",
                                    customStyles: `px-2 ${!formData.firstName.isValidated && formData.firstSubmit && 'border-red-500'}`, value: formData.firstName.value,
                                }}
                            />
                            <InputWrapper
                                wrapperStyles="w-1/2"
                                labelProps={{ htmlFor: "lastName", text: "Last Name" }}
                                inputProps={{
                                    onChangeHandler: onChangeHandler, type: "text", id: "lastName", name: "lastName",
                                    customStyles: `px-2 ${!formData.lastName.isValidated && formData.firstSubmit && 'border-red-500'}`, value: formData.lastName.value
                                }}
                            />
                        </div>
                        <div>
                            <InputWrapper
                                wrapperStyles="w-full"
                                labelProps={{ htmlFor: "email", text: "Email Address" }}
                                inputProps={{
                                    onChangeHandler: onChangeHandler, type: "text", id: "email", name: "email",
                                    customStyles: `px-10 ${!formData.email.isValidated && formData.firstSubmit && 'border-red-500'}`, icon: <EmailIcon />, value: formData.email.value
                                }}
                            />
                            <p className={`Gibson-Light hidden text-red-500 ${!formData.email.isValidated && formData.firstSubmit && '!block'}`}>Email is not in valid format!</p>
                        </div>
                        <div>
                            <InputWrapper
                                wrapperStyles="w-full"
                                labelProps={{ htmlFor: "password", text: "Password" }}
                                inputProps={{
                                    onChangeHandler: onChangeHandler, type: "password", id: "password", name: "password",
                                    customStyles: `px-10 ${!formData.password.isValidated && formData.firstSubmit && 'border-red-500'}`, icon: <PasswordIcon />, isPassword: true, value: formData.password.value
                                }}
                            />
                            <p className={`Gibson-Light text-red-500 mt-2 hidden ${!formData.password.isValidated && formData.firstSubmit && '!block'}`}>The password should be a minimum of 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.</p>
                        </div>
                        <div>
                            <InputWrapper
                                wrapperStyles="w-full"
                                labelProps={{ htmlFor: "confirmPassword", text: "Confirm Password" }}
                                inputProps={{
                                    onChangeHandler: onChangeHandler, type: "password", id: "confirmPassword", name: "confirmPassword",
                                    customStyles: `px-10 ${!formData.confirmPassword.isValidated && formData.firstSubmit && 'border-red-500'}`, icon: <PasswordIcon />, isPassword: true, value: formData.confirmPassword.value
                                }}
                            />
                            <p className={`Gibson-Light hidden text-red-500 ${!formData.confirmPassword.isValidated && formData.firstSubmit && '!block'}`}>Passwords does not match!</p>
                        </div>
                        <div>
                            <InputWrapper
                                wrapperStyles="!flex-row-reverse justify-end items-start gap-x-3"
                                labelProps={{
                                    htmlFor: "termsAndPolicyAgreement",
                                    text:
                                        <>
                                            I agree to all the <Link className="underline Gibson-Regular" href={"#"}>
                                                Terms</Link> and <Link className="underline Gibson-Regular" href={"#"}>Privacy Policy.</Link>
                                        </>
                                }}
                                inputProps={{ isCheckboxChecked: formData.termsAndPolicyAgreement, onChangeHandler: onChangeHandler, type: "checkbox", id: "termsAndPolicyAgreement", name: "termsAndPolicyAgreement", customStyles: `accent-custom-purple   !h-[18px] !w-[18px] ${!formData.termsAndPolicyAgreement && formData.firstSubmit && '!border-black'}` }}
                            />
                            <p className={`Gibson-Light hidden text-red-500 ${!formData.termsAndPolicyAgreement && formData.firstSubmit && '!block'}`}>Agreement is requried!</p>
                        </div>
                        <button className="Gibson-Regular bg-custom-purple py-3 text-white" type="submit">CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
            <div>
                {/* Image container */}
            </div>
        </section>
    )
};

export default AuthGuard(Register)
