import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = ({ onConfirm, onCancel }) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameValid = !isEmpty(enteredName);
        const streetValid = !isEmpty(enteredStreet);
        const cityValid = !isEmpty(enteredCity);
        const postalValid = isFiveChars(enteredPostal);

        setFormInputsValidity({
            name: nameValid,
            street: streetValid,
            city: cityValid,
            postal: postalValid
        });

        const formIsValid = nameValid && streetValid && postalValid && cityValid;
        if (!formIsValid) {
            return;
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Enter valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street' />
                {!formInputsValidity.street && <p>Enter valid street</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal' />
                {!formInputsValidity.postal && <p>Enter valid postal 5 chars long</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Enter valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;