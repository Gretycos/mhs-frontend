/**
 * author: Tsong
 * time: 16/03/2024 18:17
 */
import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        token: '',
        userId: ''
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const { save } = globalSlice.actions

export default globalSlice.reducer
