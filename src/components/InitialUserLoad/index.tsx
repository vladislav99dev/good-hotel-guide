"use client"
import React, { useEffect,ReactNode } from 'react'
import useTypedStoreAction from '@/store/hooks/useTypedStoreAction'
import { userDataActions } from '@/store/store'


const InitialUserLoad = ({ children }: { children: ReactNode }) => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const userData = useAppSelector(state => state.userDataSlice);

    useEffect(() => {
        getInitialUserData()
    }, [])
    
    function getInitialUserData() {
        try {
            if (typeof window !== "undefined") {
                if (localStorage.getItem("user")) {
                     dispatch(userDataActions.addUser(JSON.parse(`${localStorage.getItem("user")}`)))
                }
                if (sessionStorage.getItem("user")) {
                     dispatch(userDataActions.addUser(JSON.parse(`${sessionStorage.getItem("user")}`)))
                }
            }
        } catch (error) {
            console.log("err");
            console.log(error);
        }
    }
    return (
        <main>
            {children}
        </main>
    )
}

export default InitialUserLoad
