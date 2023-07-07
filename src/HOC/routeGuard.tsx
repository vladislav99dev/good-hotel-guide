import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useTypedStoreAction from "@/store/hooks/useTypedStoreAction";

interface Props {
    Component: React.ElementType,
    pageType: "authPage" | "page"
}

const WrapperComponent = (props: Props) => {
    const { Component, pageType, ...restprops } = props
    const { useAppSelector } = useTypedStoreAction();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const user = useAppSelector(state => state.userDataSlice);
    const router = useRouter();

    useEffect(() => {
        if (user) setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded) {
            if (pageType === "authPage") {
                if (user.email) return router.push("/")
                if (!user.email) return setRenderComponent(true)
            }
            if (pageType === "page") {
                if (!user.email) return router.push("/login")
                if (user.email) return setRenderComponent(true)
            }
        }
    }, [isLoaded])

    return renderComponent && <Component {...restprops} />
}


export const AuthGuard = (Component: React.ElementType) => {
    return WrapperComponent.bind(null, { Component: Component, pageType: "authPage" })
}

export const PageGuard = (Component: React.ElementType) => {
    return WrapperComponent.bind(null, { Component: Component, pageType: "page" })
}