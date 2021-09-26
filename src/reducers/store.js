import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import booksReducer from './books'

export default configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
    }
})