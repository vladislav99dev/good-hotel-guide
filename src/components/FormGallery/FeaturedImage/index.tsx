import { useState } from 'react'
import { ImageCardsDots, UploadIcon, SearchIcon, DownloadIcon, CopyUrlIcon, ClearFieldIcon } from '@/assets/icons/icons1'
import { Image } from '@/store/slices/hotelPageDataSlice/interfaces'
interface Props {
    image: Image
}


const FeaturedImage = (props: Props) => {
    const [featuredImageOptions, setFeaturedImageOptions] = useState<boolean>(false)

    return (
        <div className='h-[312px] bg-[#E0E0E0] flex justify-center relative'>
            <div className={`absolute h-[40px] w-[40px] right-4 z-20 top-4 ${featuredImageOptions ? 'bg-custom-purple' : 'bg-white'}`}>
                <div onClick={() => setFeaturedImageOptions((prev) => !prev)} className='flex h-full justify-center items-center cursor-pointer'>
                    <ImageCardsDots color={featuredImageOptions ? "#ffffff" : "#212121"} />
                </div>
                {featuredImageOptions && (
                    <ul className='bg-white top-[52px]  w-[180px] [&>*]:p-2 [&>li]:cursor-pointer shadow-md border-[1px] absolute left-[50%] translate-x-[-50%] [&>li]:flex [&>li]:gap-x-2 [&>li]:items-center '>
                        <div className='-top-[8px] border-t-[1px] border-l-[1px] absolute !h-[10px] !w-[10px] left-[50%] translate-x-[-50%] rotate-45 bg-white'></div>
                        <li>
                            <UploadIcon />
                            Upload</li>
                        <li>
                            <SearchIcon />
                            Select</li>
                        <li>
                            <DownloadIcon />
                            Download</li>
                        <li>
                            <CopyUrlIcon />
                            Copy URL</li>
                        <li className='text-[#B2223B]'>
                            <ClearFieldIcon />
                            Clear field</li>
                    </ul>
                )}
            </div>
            <div
                className='h-full w-[600px]'
                style={{
                    backgroundImage: `url(${props.image.asset.url})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            ></div>
        </div>
    )
}

export default FeaturedImage
