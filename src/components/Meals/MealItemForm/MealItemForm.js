import React, { useRef } from 'react';
import Input from '../../UI/Input/Input';
import classes from "./MealItemForm.module.css";

import { cartActions } from "../../../store/slices/cartSlice";
import { useDispatch } from 'react-redux';

const MealItemForm = ({ id, price, name }) => {
    const dispatch = useDispatch();
    const { addItem } = cartActions;

    const ref = useRef(1);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(addItem({
            id,
            amount: +ref.current.value,
            price,
            name
        }));
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
