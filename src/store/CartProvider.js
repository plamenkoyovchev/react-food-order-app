import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE_CART_ITEM') {
        return {
            ...state
        };
    }

    return state;
};

const CartProvider = (props) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    const addItemToCartHandler = (item) => {
        dispatch({ type: 'ADD_CART_ITEM', item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatch({ type: 'REMOVE_CART_ITEM', id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>;
};

export default CartProvider;