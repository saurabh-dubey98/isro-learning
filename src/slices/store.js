import { configureStore } from "@reduxjs/toolkit";
import mcqReducer from './mcqSlice/mcqSlice'
import isroApiReducer from './isroApiSlice/isroApiSlice'
import authReducer from './authSlice/authSlice'

export const store = configureStore({
    reducer: {
        mcq: mcqReducer,
        isroapi: isroApiReducer,
        auth: authReducer
    }
})