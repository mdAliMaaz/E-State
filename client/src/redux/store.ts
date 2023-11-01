import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import listingReducer from './features/listingSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        listing: listingReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch