import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import useTypedStoreAction from '@/store/hooks/useTypedStoreAction';

const ModalComponent = () => {
    const { dispatch, useAppSelector } = useTypedStoreAction();
    const modalData = useAppSelector(state => state.modalDataSlice);
    const router = useRouter();
    const [timer, setTimer] = useState<number>(3)


    useEffect(() => {
        if (modalData.useTimer.value)
            if (timer >= 1) {
                setTimeout(() => {
                    setTimer((prev) => {
                        return prev - 1
                    })
                }, 1000)
            } else {
                if (modalData.useTimer.path)
                    router.push(modalData.useTimer.path)

            }
    }, [timer, modalData.useTimer.path])


    return (
        <>
            {modalData.status !== "none" && (
                <div className={`py-5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
            h-[200px] w-[400px] rounded-md  shadow-[0_30px_65px_-5px_rgba(0,0,0,0.3)] border-[2px] bg-white
            flex flex-col items-center justify-center z-50 ${modalData.status === "success" ? 'border-green-500' : "border-red-500"}`
                }>
                    <h3 className='uppercase text-center text-xl'>{modalData.headingMessage}</h3>
                    <p className='text-center text-lg Gibson-Light'>{`${modalData.descriptionMessage} ${modalData.useTimer.value ? timer : ""}`}</p>
                </div>
            )}
        </>
    )
}

export default ModalComponent
