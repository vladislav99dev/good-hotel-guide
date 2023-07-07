"use client"
import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from "next/navigation"
import useTypedStoreAction from '@/store/hooks/useTypedStoreAction'
import { modalDataActions } from '@/store/store'
import { CognitoUser } from "amazon-cognito-identity-js"
import UserPool from '@/UserPool'
import Modal from '@/components/UI/modal'


const AuthenthicateEmail = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        if (params.get("code") !== null && params.get("username") !== null) {
            confirmEmail(`${params.get("username")}`, `${params.get("code")}`)
                .then(response => {
                    dispatch(modalDataActions.setModal({
                        status: "success",
                        headingMessage: "Success",
                        descriptionMessage: "You will be redirected to Login page in ",
                        useTimer: { value: true, path: "/login" }
                    }))
                })
                .catch((err) => {
                    dispatch(modalDataActions.setModal({
                        status: "failed",
                        headingMessage: "Failed",
                        descriptionMessage: err.message,
                        useTimer: { value: false }
                    }))
                    setTimeout(() => {
                        dispatch(modalDataActions.resetModal())
                        router.push("/")
                    }, 2000)
                })
        }
        return () => {
            dispatch(modalDataActions.resetModal())
        }
    }, [])

    return (
        <div className='w-screen h-screen relative'>
            <Modal />
        </div>
    )
}

export default AuthenthicateEmail


function confirmEmail(username: string, code: string) {
    const userData = {
        Username: username,
        Pool: UserPool
    }

    const cognitoUser = new CognitoUser(userData)

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, false, (err, result) => {
            if (err) reject(err)
            if (result) resolve(result)
        })
    })
}







