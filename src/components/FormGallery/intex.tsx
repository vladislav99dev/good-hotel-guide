import { Image as ImageInterface } from '@/store/slices/hotelPageDataSlice/interfaces'
import ImageCard from './ImageCard'
import FeaturedImage from './FeaturedImage'
interface Props {
    images: ImageInterface[]
    featuredImage: ImageInterface
}

const FormGallery = (props: Props) => {
    return (
        <div>
            <div className='flex flex-col gap-y-4'>
                <p>Featured Image</p>
                <FeaturedImage image={props.featuredImage} />
                <div className='grid grid-cols-4 gap-4'>
                    {props.images.map((image, imageIndex) => <ImageCard key={image._key} data={image} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default FormGallery
