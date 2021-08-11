import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import mealReducer from "./slices/mealsSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        meals: mealReducer,
        ui: uiReducer
    }
});