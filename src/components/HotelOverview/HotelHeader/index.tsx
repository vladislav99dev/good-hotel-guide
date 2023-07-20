import React from 'react'
import Link from 'next/link'
import { LeftArrow, SaveIcon, RightArrow } from '@/assets/icons/icons1'
import { Hotel } from '@/store/slices/hotelPageDataSlice/interfaces'

interface Props {
    hotel: Hotel

}

const index = (props: Props) => {
    const submitHandler = () => {
        const mutations = [{
            createOrReplace: {
                ...props.hotel,
            }
        }]

        fetch(`https://${process.env.NEXT_PUBLIC_SANITY_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_DATASET_NAME}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`
            },
            body: JSON.stringify({ mutations })
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.error(error))

    }


    return (
        <div className="h-[48px] border-b-[1px] border-[#E0E0E0]  shadow-sm flex items-center justify-between px-24  w-full">
            <div>
                <Link className="flex items-center gap-x-2 Gibson-Light underline text-custom-purple" href={"/"}>
                    <LeftArrow />
                    Dashboard</Link>
            </div>

            <div className="flex gap-x-2">
                <button className="border-[1px] border-custom-purple  uppercase h-[32px] px-6 flex items-center gap-x-2 text-custom-purple">
                    <SaveIcon />
                    Save Progress
                </button>
                <button onClick={submitHandler} className="border-1 border-custom-purple uppercase  h-[32px] px-6 flex items-center gap-x-2 bg-custom-purple text-white">
                    Submit Hotel Overview
                    <RightArrow />
                </button>
            </div>
        </div>
    )
}

export default index
