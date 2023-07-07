"use client"
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { userDataActions, loginFormDataActions } from "@/store/store";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import UserPool from "@/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import tempLogoImage from "@/assets/img/tempLogoImage.png"
import { PasswordIcon, UserIcon } from "@/assets/icons/icons1";
import InputWrapper from "@/components/UI/inputWrapper";
import { AuthGuard } from "@/HOC/routeGuard";

const Login = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const formData = useAppSelector(state => state.loginFormDataSlice);
    const router = useRouter();

    useEffect(() => {
        // if (localStorage.getItem("user") || sessionStorage.getItem("user")) router.push('/')
        return () => {
            dispatch(loginFormDataActions.resetFormData());
            dispatch(loginFormDataActions.setValidationMessage({ value: false, message: "" }));
        }
    }, [])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elementName = e.target.name.toUpperCase();
        const elementValue = e.target.value;
        dispatch(loginFormDataActions.formDataReducer({ elementName, value: elementValue }));
    };


    const handleSubmit = (e: React.FormEvent<EventTarget & HTMLFormElement>) => {
        e.preventDefault();

        if (formData.email.value && formData.password.value) {
            const authenticationDetails =
                new AuthenticationDetails({ Username: formData.email.value, Password: formData.password.value });

            const cognitoUser =
                new CognitoUser({ Username: formData.email.value, Pool: UserPool });


            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    const name: string = result.getIdToken().payload.name
                    const email: string = result.getIdToken().payload.email
                    const role: string = result.getIdToken().payload["custom:role"]
                    const jwt = result.getAccessToken().getJwtToken();

                    if (formData.rememberMe)
                        localStorage.setItem("user", JSON.stringify({ name, email, role, jwt }));
                    if (!formData.rememberMe)
                        sessionStorage.setItem("user", JSON.stringify({ name, email, role, jwt }));

                    dispatch(userDataActions.addUser({ name, email, role, jwt }))
                    dispatch(loginFormDataActions.resetFormData());
                    dispatch(loginFormDataActions.setValidationMessage({ value: false, message: "" }))
                    router.push('/');
                },
                onFailure: function (err) {
                    dispatch(loginFormDataActions.setValidationMessage({ value: true, message: "Incorrect email or password" }))
                }
            })
        } else {
            dispatch(loginFormDataActions.setValidationMessage({ value: true, message: "All fields are required!" }))
        }
    };

    return (
        <section className="flex">
            <div className="w-1/2 px-52 py-32">
                <div className="w-[80%] mx-auto mb-14 flex justify-center">
                    <Image src={tempLogoImage} alt="logo" placeholder="blur" />
                </div>
                <div className="flex flex-col gap-y-4 mb-28">
                    <h3 className="text-center Gill-Sans-Nova-SemiBold text-4xl">Log In</h3>
                    <p className="text-center Gibson-Light text-primary-two-clr">Don't have an account? <Link className="underline text-custom-purple" href={"/register"}>Create an account.</Link></p>
                </div>
                <form onSubmit={handleSubmit} className="bg-[#FAFAFA] flex flex-col p-10 gap-y-6 relative">
                    <div className={`text-center absolute top-2  left-1/2 translate-x-[-50%] -z-10 ${formData.validationMessage.value && "!-top-10"}  text-red-500`}>{formData.validationMessage.message}</div>
                    <InputWrapper
                        labelProps={{ htmlFor: "email", text: "Email" }}
                        inputProps={{ onChangeHandler: onChangeHandler, type: "text", id: "email", name: "email", customStyles: `px-10 ${formData.email.value.length < 1 && formData.validationMessage.value && 'border-red-500'}`, icon: <UserIcon /> }}
                    />
                    <InputWrapper
                        labelProps={{ htmlFor: "password", text: "Password" }}
                        inputProps={{ onChangeHandler: onChangeHandler, type: "password", id: "password", name: "password", customStyles: `px-10 ${formData.password.value.length < 1 && formData.validationMessage.value && 'border-red-500'}`, icon: <PasswordIcon />, isPassword: true }}
                    />
                    <InputWrapper
                        wrapperStyles="!flex-row-reverse !justify-end gap-x-3"
                        labelProps={{ htmlFor: "rememberMe", text: "Remember me" }}
                        inputProps={{ onChangeHandler: onChangeHandler, isCheckboxChecked: formData.rememberMe, type: "checkbox", id: "rememberMe", name: "rememberMe", customStyles: "accent-custom-purple !h-[18px] !w-[18px]" }}
                    />
                    <button className="Gibson-Regular bg-custom-purple py-3 text-white" type="submit">LOG IN</button>
                    <Link href={"/change-password"} className="Gibson-Light text-center underline text-[#616161]">Forgot your password ?</Link>
                </form>
            </div>
            <div className="w-1/2">
                {/* Image container */}
            </div>
        </section>
    )
}


export default AuthGuard(Login)
