import React, { useState } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import Checkout from "../Checkout/Checkout";

import { cartActions } from "../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = ({ onClose }) => {
	const dispatch = useDispatch();

	const { items, totalAmount } = useSelector((state) => state.cart);
	const { addItem, removeItem, clearCart } = cartActions;

	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const hasItems = items.length > 0;

	const onAddHandler = (item) =>
		dispatch(
			addItem({
				...item,
				amount: 1,
			})
		);

	const onRemoveHandler = (id) => dispatch(removeItem(id));

	const orderHandler = () => setIsCheckout(true);

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		try {
			await fetch(
				"https://foodapp-a0f2e-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
				{
					method: "POST",
					body: JSON.stringify({
						user: userData,
						orderedItems: items,
					}),
				}
			);

			dispatch(clearCart());
		} catch (error) {
		} finally {
			setIsSubmitting(false);
			setDidSubmit(true);
		}
	};

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

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{`$${totalAmount.toFixed(2)}`}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={onClose}>
					Close
				</button>
				{hasItems && (
					<button onClick={orderHandler} className={classes.button}>
						Order
					</button>
				)}
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
			)}
		</>
	);

	const isSubmittingModalContent = (
		<>
			<p>Sending order data...</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);
	const isSubmittedModalContent = (
		<>
			<p>Order submitted successfully.</p>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && isSubmittedModalContent}
		</Modal>
	);
};

export default Cart;
