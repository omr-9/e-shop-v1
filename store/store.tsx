import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import favReducer from './favSlice'

const store = configureStore({
    reducer:{
        Cart: cartReducer ,
        favorites: favReducer,
        
    }
})
export type RootState = ReturnType<typeof store.getState> 
export type AddDispatch = typeof store.dispatch
export default store