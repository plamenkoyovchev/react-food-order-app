import React, { Fragment } from 'react';
import imageMeals from "../../../assets/images/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from './HeaderCartButton';

const Header = () => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes["main-image"]}>
                <img src={imageMeals} alt="Food table" />
            </div>
        </Fragment>
    );
};

export default Header;
