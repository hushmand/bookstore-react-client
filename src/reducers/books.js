import { createSlice } from '@reduxjs/toolkit'

export const books = createSlice({
    name: 'books',
    initialState: {
        value: []
    },
    reducers: {
        addAll: (state, action) => {
            state.value.push(...action.payload)
        },
        clearAll: state => {
            state.value = []
        },

    }
})

// Action creators are generated for each case reducer function
export const { addAll, clearAll } = books.actions

export default books.reducer