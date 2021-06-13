import React, { Fragment } from 'react';
import imageMeals from "../../../assets/images/meals.jpg";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <button>Cart</button>
            </header>
            <div className={classes["main-image"]}>
                <img src={imageMeals} alt="Food table" />
            </div>
        </Fragment>
    );
};

export default Header;
