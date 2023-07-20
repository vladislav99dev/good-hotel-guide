import React from 'react'

export interface SelectProps {
    options: { value: string, label: String }[],
    placeholder: string,
    customStyles: string,
    name: string,
    value: string,
    onChangeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, customStyles, placeholder, onChangeHandler, name, value }: SelectProps) => {
    return (
        <select className={`${customStyles} border-[1px] h-[48px] border-[rgba(224, 224, 224, 1)]  px-2`}
            defaultValue={value?.length > 0 ? value : placeholder}
            onChange={onChangeHandler}
            name={name}
        >
            <option value="">{placeholder}</option>
            {options.map((el, index) => {
                return <option value={el.value} key={index}>{el.label}</option>
            })}
        </select>
    )
}

export default Select
