import { createSlice } from "@reduxjs/toolkit"

const user = localStorage.getItem('user')
const dummyUser = {
    email: 'test@email.com',
    pass: 1234
}

const initialState = {
    isLoggedIn: user ? true : false
}

const mcqSlice = createSlice({
    name: "mcq",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.email === dummyUser.email && action.payload.pass === '1234') {
                localStorage.setItem('user', 'test@email.com')
                state.isLoggedIn = true
            }
        },
        logout: (state) => {
            localStorage.removeItem('user')
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = mcqSlice.actions
export default mcqSlice.reducer