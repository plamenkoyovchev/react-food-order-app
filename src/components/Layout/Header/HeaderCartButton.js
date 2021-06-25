import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
	const [itemHighlighted, setItemHighlighted] = useState(false);

	const cartContext = useContext(CartContext);
	const { items } = cartContext;

	const numberOfCartItems = items.reduce(
		(currentSum, item) => currentSum + item.amount,
		0
	);

	let btnClasses = `${classes.button} ${itemHighlighted ? classes.bump : ""}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}

		setItemHighlighted(true);

		const timer = setTimeout(() => {
			setItemHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
