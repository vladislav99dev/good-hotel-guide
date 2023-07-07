export interface User {
    email: string,
    name: string,
    role: "superAdmin" | "reviewer" | "hotelManager" | string,
    jwt: string
}