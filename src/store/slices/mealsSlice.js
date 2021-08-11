import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meals: []
};

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        setMeals: (state, action) => {
            state.meals = action.payload;
        },
        clearMeals: (state) => {
            state.meals = initialState.meals;
        }
    }
});

export const mealsActions = mealsSlice.actions;
export default mealsSlice.reducer;