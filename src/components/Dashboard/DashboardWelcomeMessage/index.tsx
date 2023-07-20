"use client"
import React, { useEffect,  useState } from 'react'
import { User } from '@/store/slices/userDataSlice/interfaces'

interface Props {
    userData: User
}

const DashboardWelcomeMessage = ({ userData }: Props) => {
    const [headingMessage, setHeadingMessage] = useState<string>(" ");
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        setHeadingMessage(`Manage ${userData.role === 'hotelManager' ? 'Hotels' : userData.role === "reviewer" ? "Reviews" : "filler Data For Super Admin"}`)
        setUserName(userData.name)
    }, [userData])

    return (
        <div className='text-[#212121] mb-8 flex flex-col gap-y-6 mt-12'>
            {/* <p className='text-sm uppercase min-h-[20px]'>{headingMessage}</p> */}
            <p className='text-sm uppercase min-h-[20px]'>Manage {userData.role === "hotelManager" ? "Hotels" : userData.role === "reviewer" ? "Review" : "figure out admin text"}</p>
            <h3 className='Gill-Sans-Nova-SemiBold text-4xl min-h-[40px]'>{`Welcome, ${userName}`}</h3>
            <div className='Gibson-Light text-lg max-w-[800px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat
                ,ipsum ac auctor ornare, nunc ligula scelerisque eros.</div>
        </div>
    )
}

export default DashboardWelcomeMessage
