"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useTypedStoreAction from '@/store/hooks/useTypedStoreAction';
import { userDataActions, initialHotelDataActions } from '@/store/store';
import { useRouter } from 'next/navigation';
import temlpLogoImageNav from "@/assets/img/temlpLogoImageNav.png";
import { UserIconBtn } from '@/assets/icons/icons1';


const Header = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction()
    const { email } = useAppSelector(state => state.userDataSlice)
    const router = useRouter();

    const btnHandler = () => {
        router.push('/login')
        if (email) {
            if (localStorage.getItem("user")) localStorage.removeItem("user")
            if (sessionStorage.getItem("user")) sessionStorage.removeItem("user")
            dispatch(userDataActions.removeUser());
            dispatch(initialHotelDataActions.clearHotelsData())
        }
    }

    return (
        <nav className='h-[60px] w-full bg-custom-purple flex justify-between items-center px-24'>
            <Link href="/">
                <Image src={temlpLogoImageNav} alt="logo" placeholder='blur' />
            </Link>
            <button onClick={btnHandler} className='w-[102px] h-[40px] bg-[#fff] rounded-lg text-custom-purple flex items-center px-2 justify-center gap-x-2  uppercase text-sm'><UserIconBtn />{email ? "Logout" : "Login"}</button>
        </nav>
    )
}

export default Header
