import React from 'react';
import MealItemForm from '../MealItemForm/MealItemForm';
import classes from "./MealItem.module.css";

const MealItem = ({ id, name, price, description }) => {
    const priceFormatted = `$${price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{priceFormatted}</div>
            </div>
            <div>
                <MealItemForm id={id} price={price} name={name} />
            </div>
        </li>
    );
};

export default MealItem;
