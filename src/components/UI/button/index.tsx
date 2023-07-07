import React from "react";

interface Props {
  children: React.ReactElement<any> | string;
  customStyle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick, customStyle }: Props) {
  return (
    <button onClick={onClick} className={`border-4 ${customStyle}`}>
      {children}
    </button>
  );
}
