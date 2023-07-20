import HideShowFormComponents from "@/HOC/hideShowComponents"
import { DisplayOptions } from "@/store/slices/hotelPageDataSlice/interfaces"
import FormFieldsWrapper from "../../UI/inputWrapper"

interface Props {
    data: DisplayOptions
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}

const DisplayOptions = (props: Props) => {
    const styles = " border-[1px] !flex-row-reverse !justify-end p-4 gap-x-2 h-full shadow-sm "
    return (
        <section className="grid grid-cols-2  gap-x-8 gap-y-10">
            <FormFieldsWrapper wrapperStyles={styles} labelProps={{ htmlFor: "paid", text: `Has paid` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "paid", id: "paid", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.paid }}
            />
            <FormFieldsWrapper wrapperStyles={styles} labelProps={{ htmlFor: "inGuide", text: `In guide` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "inGuide", id: "inGuide", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.inGuide }}
            />
            <FormFieldsWrapper wrapperStyles={styles} labelProps={{ htmlFor: "shortlist", text: `Shortlist` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "shortlist", id: "shortlist", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.shortlist }}
            />
            <FormFieldsWrapper wrapperStyles={styles} labelProps={{ htmlFor: "extended", text: `Extended` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "extended", id: "extended", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.extended }}
            />
            <FormFieldsWrapper wrapperStyles={styles} labelProps={{ htmlFor: "omitted", text: `Omitted` }}
                inputProps={{ onChangeHandler: props.onChangeHandler, type: "checkbox", name: "omitted", id: "omitted", customStyles: "!p-0 !h-[20px] !w-[20px] text-[#9E9E9E]", isCheckboxChecked: props.data.extended }}
            />
        </section>
    )
}

export default HideShowFormComponents(DisplayOptions)
