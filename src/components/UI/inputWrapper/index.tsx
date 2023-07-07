import { InputProps } from "../input"
import Label, { LabelProps } from "../label"
import Input from "@/components/UI/input/index"

interface InputWrapperProps {
    inputProps: InputProps,
    labelProps: LabelProps,
    wrapperStyles?: string,
}


const InputWrapper = ({ inputProps, labelProps, wrapperStyles }: InputWrapperProps) => {
    return (
            <div className={`flex flex-col gap-y-2 Gibson-Light ${wrapperStyles && wrapperStyles}`}>
                <Label {...labelProps} />
                <Input {...inputProps} />
            </div>
    )
}

export default InputWrapper