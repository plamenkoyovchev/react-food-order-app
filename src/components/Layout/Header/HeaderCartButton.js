import React, { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = ({ onClick }) => {
    const cartContext = useContext(CartContext);
    const numberOfCartItems = cartContext.items
        .reduce((currentSum, item) => currentSum + item.amount, 0);

    return (
        <button className={classes.button} onClick={onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;
