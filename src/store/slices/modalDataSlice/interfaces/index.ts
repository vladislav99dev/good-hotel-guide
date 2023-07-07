export interface Modal {
    status: "failed" | "success" | "none",
    headingMessage: string,
    descriptionMessage: string,
    useTimer: {
        value: boolean,
        path?: string
    }
}