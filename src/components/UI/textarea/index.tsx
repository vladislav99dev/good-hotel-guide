export interface TextAreaProps {
    placeholder: string,
    customStyles: string,
    name: string,
    value: string,
    onChangeHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ customStyles, placeholder, onChangeHandler, name, value }: TextAreaProps) => {
    return (
        <textarea className={`${customStyles} border-[1px] h-[48px] border-[rgba(224, 224, 224, 1)]  px-2`}
            defaultValue={value.length > 0 ? value : placeholder}
            onChange={onChangeHandler}
            name={name}
        >
        </textarea>
    )
}

export default TextArea


