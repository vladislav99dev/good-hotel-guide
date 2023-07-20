import Input, { InputProps } from "../input"
import Label, { LabelProps } from "../label"
import Select, { SelectProps } from "../select"
import TextArea, { TextAreaProps } from "../textarea"

interface FormFieldsWrapper {
    inputProps?: InputProps,
    selectProps?: SelectProps
    textareaProps?: TextAreaProps
    labelProps: LabelProps,
    wrapperStyles?: string,
}


const FormFieldsWrapper = ({ inputProps, labelProps, wrapperStyles, selectProps, textareaProps }: FormFieldsWrapper) => {
    return (
        <div className={`flex flex-col gap-y-2 Gibson-Light ${wrapperStyles && wrapperStyles}`}>
            <Label {...labelProps} />
            {inputProps && <Input {...inputProps} />}
            {textareaProps && <TextArea {...textareaProps} />}
            {selectProps && <Select {...selectProps} />}

        </div>
    )
}

export default FormFieldsWrapper