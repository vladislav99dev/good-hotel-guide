import FormFieldsWrapper from "../../UI/inputWrapper"
import { AddressGroup } from "@/store/slices/hotelPageDataSlice/interfaces"
import HideShowFormComponents from "@/HOC/hideShowComponents"



interface Props {
  data: AddressGroup
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
}

const index = (props: Props) => {
  return (
    <section className=" relative">
      <div className="grid grid-cols-2  gap-8">
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "street", text: `Street` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "street", id: "street", customStyles: "px-4 text-[#9E9E9E]", value: props.data.street }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "village", text: `Village` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "village", id: "village", customStyles: "px-4 text-[#9E9E9E]", value: props.data.village }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "town", text: `Town` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "town", id: "town", customStyles: "px-4 text-[#9E9E9E]", value: props.data.town }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "county", text: `County` }}
          selectProps={{ onChangeHandler: props.onChangeHandler, value: props.data.county, options: [{ value: "Sussex", label: "Sussex" }], name: "county", customStyles: " text-[#9E9E9E]", placeholder: props.data.county }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "postCode", text: `Post Code` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "postCode", id: "postCode", customStyles: "px-4 text-[#9E9E9E]", value: props.data.postCode }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "country", text: `Country` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "country", id: "country", customStyles: "px-4 text-[#9E9E9E]", value: props.data.country }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize" labelProps={{ htmlFor: "region", text: `Region` }}
          inputProps={{ onChangeHandler: props.onChangeHandler, type: "text", name: "region", id: "region", customStyles: "px-4 text-[#9E9E9E]", value: props.data.region }}
        />
        <FormFieldsWrapper wrapperStyles="capitalize col-span-2" labelProps={{ htmlFor: "trainStation", text: `Train Station` }}
          textareaProps={{ onChangeHandler: props.onChangeHandler, value: "trainStation", name: "trainStation", customStyles: "min-h-[130px] pt-2 text-[#9E9E9E]", placeholder: "" }}
        />
      </div>
    </section >
  )
}

export default HideShowFormComponents(index)
