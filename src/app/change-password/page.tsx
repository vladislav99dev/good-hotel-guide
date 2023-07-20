"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { resetPasswordFormDataActions, modalDataActions } from '@/store/store'
import useTypedStoreAction from '@/store/hooks/useTypedStoreAction'
import { CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '@/UserPool'
import { PasswordIcon, UserIcon } from '@/assets/icons/icons1'
import Modal from "@/components/UI/modal/index"
import FormFieldsWrapper from '@/components/UI/inputWrapper'
import tempLogoImage from "@/assets/img/tempLogoImage.png"



const ChangePassword = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction()
    const formData = useAppSelector(state => state.resetPasswordFormDataSlice)

    console.log(formData.email.length);

    useEffect(() => {
        return () => {
            dispatch(modalDataActions.resetModal())
            dispatch(resetPasswordFormDataActions.resetFormData())
        }
    }, [])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name.toUpperCase();

        const elementValue = e.target.value;

        if (formData.email.length !== 0
            && formData.code.length !== 0
            && formData.password.value.length !== 0
            && formData.confirmPassword.value.length !== 0) dispatch(resetPasswordFormDataActions.setIsFormFilled(true))
        dispatch(resetPasswordFormDataActions.formDataReducer({ elementName, value: elementValue }))
    };

    const submitHandler = (e: React.FormEvent<EventTarget & HTMLFormElement>) => {
        e.preventDefault();

        dispatch(resetPasswordFormDataActions.setFirstSubmit(true))
        const cognitoUser = new CognitoUser({ Username: formData.email, Pool: UserPool })

        if (formData.step === 1) {
            if (formData.email.length === 0) return dispatch(resetPasswordFormDataActions.setIsFormFilled(false))
            cognitoUser.forgotPassword({
                onSuccess: function (result) {
                    dispatch(resetPasswordFormDataActions.setFirstSubmit(false))
                    dispatch(modalDataActions.setModal({ status: "success", descriptionMessage: "A verification code have been sent", headingMessage: "Success", useTimer: { value: false } }))
                    setTimeout(() => {
                        dispatch(modalDataActions.resetModal())
                        dispatch(resetPasswordFormDataActions.changeStep(2))
                    }, 3000)
                },
                onFailure: function (err) {
                    console.log(err);
                    // dispatch(modalDataActions.setModal({ status: "failed", descriptionMessage: err.message, headingMessage: "Failed", useTimer: { value: true } }))
                    // dispatch(resetPasswordFormDataActions.resetFormData())
                    // dispatch(modalDataActions.resetModal())
                }
            })
        }
        if (formData.step === 2) {
            if (!formData.password.isValidated && !formData.confirmPassword.isValidated && formData.code.length === 0) return dispatch(resetPasswordFormDataActions.setIsFormFilled(false))
            cognitoUser.confirmPassword(formData.code, formData.password.value, {
                onSuccess: function (result) {
                    dispatch(modalDataActions.setModal({ status: "success", descriptionMessage: "You will be redirected to Login page in ", headingMessage: "Success", useTimer: { value: true, path: "/login" } }))
                    // setTimeout(() => {
                    //     dispatch(modalDataActions.resetModal())
                    // }, 3000)
                },
                onFailure: function (err) {
                    dispatch(modalDataActions.setModal({ status: "failed", descriptionMessage: err.message, headingMessage: "Failed", useTimer: { value: true, path: "/change-password" } }))
                    setTimeout(() => {
                        dispatch(modalDataActions.resetModal())
                        dispatch(resetPasswordFormDataActions.resetFormData())
                    }, 3000)

                }
            })
        }
    }

    return (
        <div className='flex items-center relative'>
            <Modal />
            <div className='flex flex-col items-center justify-center gap-y-10 w-1/2 px-52 py-32'>
                <Image src={tempLogoImage} alt="logo" placeholder='blur' />
                <h3 className='text-center Gill-Sans-Nova-SemiBold text-4xl'>Recover Password</h3>
                <form onSubmit={submitHandler} className='bg-[#FAFAFA] p-10 flex flex-col gap-y-8 relative min-w-[540px]'>
                    <div className={`Gibson-Light text-center absolute top-2 left-1/2 translate-x-[-50%] -z-10 
                        ${((formData.step === 1 && formData.email.length === 0 && formData.firstSubmit) || (formData.step === 2 && !formData.areFieldsFilled && formData.firstSubmit))
                        && '!-top-8'}  text-red-500`}>
                        All fields are required!
                    </div>
                    {formData.step === 1 && (
                        <>
                            <FormFieldsWrapper
                                labelProps={{ htmlFor: "email", text: "Email" }}
                                inputProps={{ onChangeHandler: onChangeHandler, type: "text", id: "email", name: "email", customStyles: `px-10 ${formData.email.length === 0 && formData.firstSubmit && "border-red-500"}`, icon: <UserIcon /> }}
                                wrapperStyles='min-w-[350px]'
                            />
                            <button className="Gibson-Regular bg-custom-purple py-3 text-white w-[200px]  mx-auto" type="submit">Submit</button>
                        </>
                    )}
                    {formData.step === 2 && (
                        <>
                            <FormFieldsWrapper
                                labelProps={{ htmlFor: "code", text: "Verification Code" }}
                                inputProps={{ onChangeHandler: onChangeHandler, type: "text", id: "code", name: "code", customStyles: `px-10 ${formData.code.length === 0 && formData.firstSubmit && "border-red-500"}` }}
                                wrapperStyles='min-w-[350px]'
                            />
                            <div>

                                <FormFieldsWrapper
                                    labelProps={{ htmlFor: "password", text: "New Pasword" }}
                                    inputProps={{ onChangeHandler: onChangeHandler, type: "password", id: "password", name: "password", customStyles: `px-10  ${!formData.password.isValidated && formData.firstSubmit && "border-red-500"}`, icon: <PasswordIcon />, isPassword: true }}
                                    wrapperStyles='min-w-[350px]'
                                />
                                <p className={`Gibson-Light text-red-500 mt-2 hidden ${!formData.password.isValidated && formData.firstSubmit && '!block'}`}>The password should be a minimum of 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.</p>

                            </div>
                            <div>

                                <FormFieldsWrapper
                                    labelProps={{ htmlFor: "confrimPassword", text: "Confirm Password" }}
                                    inputProps={{ onChangeHandler: onChangeHandler, type: "password", id: "confirmPassword", name: "confirmPassword", customStyles: `px-10 ${!formData.confirmPassword.isValidated && formData.firstSubmit && "border-red-500"}`, icon: <PasswordIcon />, isPassword: true }}
                                    wrapperStyles='min-w-[350px]'
                                />
                                <p className={`Gibson-Light hidden text-red-500 ${!formData.confirmPassword.isValidated && formData.firstSubmit && '!block'}`}>Passwords does not match!</p>
                            </div>
                            <button className="Gibson-Regular bg-custom-purple py-3 text-white w-[200px]  mx-auto" type="submit">Submit</button>

                        </>
                    )}

                </form>
            </div>
            <div>
                {/* Image container */}
            </div>
        </div>
    )
}

export default ChangePassword
