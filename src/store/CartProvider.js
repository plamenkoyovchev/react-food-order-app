import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD_CART_ITEM") {
		let updatedItems;
		const itemToUpdateIndex = state.items.findIndex(i => i.id === action.item.id);
		const itemToUpdate = state.items[itemToUpdateIndex];
		if (itemToUpdate) {
			const updatedItem = {
				...itemToUpdate,
				amount: itemToUpdate.amount + action.item.amount
			};
			updatedItems = [...state.items];
			updatedItems[itemToUpdateIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		return {
			...state,
			items: updatedItems,
			totalAmount: updatedTotalAmount
		};
	}

	if (action.type === "REMOVE_CART_ITEM") {
		const itemToRemoveIndex = state.items.findIndex(i => i.id === action.id);
		const itemToRemove = state.items[itemToRemoveIndex];
		if (!itemToRemove) {
			return;
		}

		let updatedItems;
		if (itemToRemove.amount > 1) {
			const updatedItem = {
				...itemToRemove,
				amount: itemToRemove.amount - 1
			};

			updatedItems = [...state.items];
			updatedItems[itemToRemoveIndex] = updatedItem;
		} else {
			updatedItems = state.items.filter(i => i.id !== itemToRemove.id);
		}

		const totalAmount = state.totalAmount - itemToRemove.price;

		return {
			...state,
			items: updatedItems,
			totalAmount
		};
	}

	return state;
};

const CartProvider = (props) => {
	const [cartState, dispatch] = useReducer(cartReducer, initialState);

	const addItemToCartHandler = (item) => {
		dispatch({ type: "ADD_CART_ITEM", item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatch({ type: "REMOVE_CART_ITEM", id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
