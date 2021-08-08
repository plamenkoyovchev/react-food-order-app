import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const itemToUpdate = state.items.find(i => i.id === action.payload.id);
            if (itemToUpdate) {
                itemToUpdate.amount += action.payload.amount;
            } else {
                state.items.push(action.payload);
            }

            state.totalAmount += action.payload.price * action.payload.amount;
        },
        removeItem: (state, action) => {
            const itemToRemove = state.items.find(i => i.id === action.payload);
            if (!itemToRemove) {
                return;
            }

            if (itemToRemove.amount > 1) {
                itemToRemove.amount--;
            } else {
                state.items = state.items.filter(i => i.id !== itemToRemove.id);
            }

            state.totalAmount -= itemToRemove.price;
        },
        clearItems: (state) => {
            state = initialState;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;