import { useState } from 'react'
import { ImageCardsDots, RemoveIcon, DuplicateIcon, AddItemAfterIcon, AddItemBeforeIcon } from '@/assets/icons/icons1'
import { Image } from '@/store/slices/hotelPageDataSlice/interfaces'

interface Props {
    data: Image
}

const ImageCard = (props: Props) => {
    const [options, setOptions] = useState<boolean>(false)
    return (
        <div className='flex flex-col border-[1px]'>
            <div
                className='h-[304px] w-full'
                style={{
                    backgroundImage: `url(${props.data.asset.url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            ></div>
            <div className='h-[64px] relative'>
                <div className={`absolute right-2 top-[50%] translate-y-[-50%] border-1`}>
                    <div onClick={() => setOptions((prev) => !prev)} className={`cursor-pointer flex justify-center items-center w-[40px] h-[40px] border-[2px] rounded-md  ${options ? "border-custom-purple bg-[#D0E3FF]" : "border-white bg-white"}`}>
                        <ImageCardsDots />
                    </div>
                    {options && (
                        <ul className='absolute w-[180px] bg-white [&>*]:p-2   shadow-md border-[1px] top-[52px] left-[50%] translate-x-[-50%] [&>*]:flex [&>*]:items-center [&>*]:gap-x-2 [&>li]:cursor-pointer'>
                            <div className='-top-[10px]  border-t-[1px] border-l-[1px] absolute !h-[10px] !w-[10px] left-[50%] translate-x-[-50%] rotate-45 bg-white'></div>
                            <li className={`px-4 ${options && "text-custom-purple"}`}>
                                <RemoveIcon color={options ? "#8C0052" : "#757575"} />
                                Remove</li>
                            <li className='px-4'>
                                <DuplicateIcon />
                                Duplicate</li>
                            <li className='px-4'>
                                <AddItemBeforeIcon />
                                Add item before</li>
                            <li className='px-4'>
                                <AddItemAfterIcon />
                                Add item after</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageCard
