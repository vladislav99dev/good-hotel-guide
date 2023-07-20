import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";
import { SectionsHideDropdown, SectionsShowDropdown } from "@/assets/icons/icons1";

const HideShowFormComponents = (Component: React.ElementType) => {
    const WrapperComponent = (props: any) => {
        const [toggleSection, setToggleSection] = useState<boolean>(true)
        return (
            <div className="relative">
                <header className="flex flex-col gap-y-4 ">
                    <h3 className="text-4xl text-custom-purple Gill-Sans-Nova-SemiBold">{props.headingInfo.header}</h3>
                    <p className="Gibson-Light mb-8 text-lg">{props.headingInfo.description}</p>
                </header>
                {toggleSection && (
                    <Component {...props} />
                )}
                <div onClick={() => {
                    setToggleSection((prev) => !prev)
                }} className={`absolute top-0 right-0 cursor-pointer h-[40px] flex items-center transition-all duration-2000 ease-in-out`}>
                    {toggleSection ? (
                        <SectionsShowDropdown />
                    ) : (
                        <SectionsHideDropdown />
                    )}
                </div>
            </div>
        )
    }

    return WrapperComponent

}


export default HideShowFormComponents