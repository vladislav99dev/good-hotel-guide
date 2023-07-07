import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "./interfaces/index"

let initialState: User = {
    email: "",
    name: "",
    role: "",
    jwt: ""
}

const userDataSlice = createSlice({
    name: "initialUserData",
    initialState,
    reducers: {
        addUser: (state: User, action: PayloadAction<User>) => state = { ...action.payload },
        removeUser: (state: User) => state = { ...initialState },
    }
})

export default userDataSlice