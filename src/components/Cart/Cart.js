import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartContext = useContext(CartContext);
	const { items, totalAmount, addItem, removeItem } = cartContext;

	const hasItems = items.length > 0;

	const onAddHandler = (item) =>
		addItem({
			...item,
			amount: 1,
		});

	const onRemoveHandler = (id) => removeItem(id);

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{items &&
				items.map((item) => (
					<CartItem
						key={item.id}
						name={item.name}
						amount={item.amount}
						price={item.price}
						onAdd={() => onAddHandler(item)}
						onRemove={() => onRemoveHandler(item.id)}
					/>
				))}
		</ul>
	);

	return (
		<Modal>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{`$${totalAmount.toFixed(2)}`}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
