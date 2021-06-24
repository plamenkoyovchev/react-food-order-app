import React, { useContext, useRef } from 'react';
import CartContext from '../../../store/cart-context';
import Input from '../../UI/Input/Input';
import classes from "./MealItemForm.module.css";

const MealItemForm = ({ id, price, name }) => {
    const cartContext = useContext(CartContext);
    const { addItem } = cartContext;

    const ref = useRef(1);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        addItem({
            id,
            amount: +ref.current.value,
            price,
            name
        });
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
                label="Amount"
                input={{
                    id: `amount_${id}`,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                    ref
                }} />
            <button>+ Add</button>
        </form>
    );
};

export default MealItemForm;
