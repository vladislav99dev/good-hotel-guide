import { Management } from "@/store/slices/hotelPageDataSlice/interfaces"
import FormFieldsWrapper from "@/components/UI/inputWrapper"
import HideShowFormComponents from "@/HOC/hideShowComponents"
import hotelStatusTypes from "@/utils/schemas/hotelStatusTypes"

interface Props {
    data: Management
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}

const Management = (props: Props) => {
    return (
        <section className="grid grid-cols-2 gap-8">
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "accessId", text: `Access ID` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "accessId", id: "accessId", customStyles: "px-4 text-[#9E9E9E]", value: props.data.accessId }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "hotelStatusType", text: `Hotel Status Type` }}
                selectProps={{ onChangeHandler: props.onChangeHandler, value: props.data.hotelStatusType.value, options: [...hotelStatusTypes], name: "hotelStatusType", customStyles: " text-[#9E9E9E]", placeholder: "Select Hotel Status Type" }}
            />
            <FormFieldsWrapper wrapperStyles="capitalize col-span-2" labelProps={{ htmlFor: "trainStation", text: `Filler Data` }}
                textareaProps={{ onChangeHandler: props.onChangeHandler, value: "fillerData", name: "fillerData", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
            />
        </section>
    )
}

export default HideShowFormComponents(Management)
