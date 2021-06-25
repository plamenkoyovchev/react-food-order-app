import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartContext = useContext(CartContext);
	const { items, totalAmount } = cartContext;

	const hasItems = items.length > 0;

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{items && items.map((item) => <li key={item.id}>{item.name}</li>)}
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
