import React from "react"
import { ShowPasswordIcon } from "@/assets/icons/icons1"

export interface InputProps {
  type: string,
  name: string,
  id: string,
  customStyles: string,
  icon?: JSX.Element,
  isPassword?: boolean,
  isCheckboxChecked?: boolean,
  placeholder?: string,
  value?: string,
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const Input = ({ type, name, id, customStyles, icon, isPassword, onChangeHandler, isCheckboxChecked = false, value, placeholder }: InputProps) => {

  function togglePassword(e: React.MouseEvent<HTMLDivElement>) {
    const inputElement = e.currentTarget.parentElement?.children[0];
    const inputType = inputElement?.getAttribute("type");
    if (inputType === "text") inputElement?.setAttribute("type", "password")
    if (inputType === "password") inputElement?.setAttribute("type", "text")
  }

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={value}
        className={`border-[1px] h-[48px] border-[rgba(224, 224, 224, 1)] w-full ${customStyles}`}
        defaultChecked={isCheckboxChecked}
        placeholder={placeholder && placeholder}
        onChange={onChangeHandler && onChangeHandler}
      />
      {icon && (
        <div className="absolute top-0 left-0 h-full flex items-center px-4">
          {icon}
        </div>
      )}
      {isPassword && (
        <div onClick={togglePassword} className="absolute top-0 right-0 h-full flex items-center px-4 cursor-pointer">
          <ShowPasswordIcon />
        </div>
      )}
    </div>
  )

}

export default Input
