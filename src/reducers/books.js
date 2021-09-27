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
        removeAt: (state, action) => {
            state.value.splice(action.payload, 1)
        },
        add: (state, action) => {
            state.value.push(action.payload)
        },
    }
})

// Action creators are generated for each case reducer function
export const { addAll, clearAll, removeAt,add } = books.actions

export default books.reducer