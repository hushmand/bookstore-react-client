import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
    name: 'auth',
    initialState: {
        value: ''
    },
    reducers: {
        addToken: (state, action) => {
            state.value += action.payload
        },
        clearToken: state => {
            state.value = ''
        },

    }
})

// Action creators are generated for each case reducer function
export const { clearToken, addToken } = auth.actions

export default auth.reducer