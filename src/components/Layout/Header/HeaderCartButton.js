import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
	const [itemHighlighted, setItemHighlighted] = useState(false);
	const { items } = useSelector((state) => state.cart);
	console.log('ITEMS', items);
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
