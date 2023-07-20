import useTypedStoreAction from '@/store/hooks/useTypedStoreAction'
import { hotelPageDataActions } from '@/store/store'
import { HotelInformation } from '@/store/slices/hotelPageDataSlice/interfaces'
import HideShowFormComponents from '@/HOC/hideShowComponents'
import FormFieldsWrapper from '@/components/UI/inputWrapper'
import searchTagOptions from '@/utils/schemas/searchTagOptions'
import { MultiSelect } from 'react-multi-select-component'

interface Props {
    data: HotelInformation
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}



const HotelInformation = (props: Props) => {
    const { dispatch, useAppSelector } = useTypedStoreAction();

    const customSelectHandler = (data: []) => {
        dispatch(hotelPageDataActions.hotelInformationReducer({ elementName: "searchTags", value: [...data] }))
    }


    return (
        <section className='grid grid-cols-2 gap-8'>
            <div className='flex flex-col gap-y-2 Gibson-Light col-span-2'>
                <label htmlFor="searchTags">Search tags - search from list or create a new tag</label>
                <MultiSelect options={searchTagOptions} value={props.data.searchTags} labelledBy='searchTags' onChange={customSelectHandler} />
            </div>

            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "bedrooms", text: `Bedrooms` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.bedrooms, name: "bedrooms", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "smoking", text: `Smoking` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.smoking, name: "smoking", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "dogs", text: `Dogs` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.dogs, name: "dogs", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "prices", text: `Prices` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.prices, name: "prices", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "open", text: `Open` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.open, name: "open", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "backgroundMusic", text: `Background Music` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.backgroundMusic, name: "backgroundMusic", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "children", text: `Children` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.children, name: "children", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "creditCards", text: `Credit Cards` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.creditCards, name: "creditCards", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "minPrice", text: `Min Price` }}
                selectProps={{ onChangeHandler: props.onChangeHandler, value: `${props.data.minPrice}`, name: "minPrice", customStyles: "text-[#9E9E9E]", placeholder: `${props.data.minPrice}`, options: [{ value: "10", label: "10" }, { value: "20", label: "20" }] }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "maxPrice", text: `Max price` }}
                selectProps={{ onChangeHandler: props.onChangeHandler, value: `${props.data.maxPrice}`, name: "maxPrice", customStyles: "text-[#9E9E9E]", placeholder: `${props.data.maxPrice}`, options: [{ value: "10", label: "10" }, { value: "20", label: "20" }] }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize col-span-2" labelProps={{ htmlFor: "locationDescription", text: `Location description` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: props.data.locationDescription, name: "locationDescription", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
        </section>
    )
}

export default HideShowFormComponents(HotelInformation)
