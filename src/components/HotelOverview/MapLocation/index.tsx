import { Location } from '@/store/slices/hotelPageDataSlice/interfaces'
import { TrashIcon, EditIcon } from '@/assets/icons/icons1'
import HideShowFormComponents from '@/HOC/hideShowComponents'



interface Props {
    data: Location,
}

const MapLocation = (props: Props) => {
    return (
        <section className='relative'>
            <div className='flex justify-between gap-x-4 text-white '>
                <button className='bg-[#212121] w-full h-[48px]  !uppercase text-lg flex justify-center items-center gap-x-2'>
                    <EditIcon />
                    Edit</button>
                <button className='bg-custom-purple w-full h-[48px] !uppercase text-lg flex justify-center items-center gap-x-2'>
                    <TrashIcon />
                    Remove</button>
            </div>
        </section>
    )
}

export default HideShowFormComponents(MapLocation)
