import React from "react"

export interface LabelProps {
    htmlFor: string,
    text: string | JSX.Element
}


const Label = ({ htmlFor, text }: LabelProps) => (
    <label htmlFor={htmlFor}>{text}</label>
)

export default Label