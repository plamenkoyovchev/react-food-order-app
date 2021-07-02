import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://foodapp-a0f2e-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
			const data = await response.json();
			const mealItems = [];
			for (const key in data) {
				const meal = data[key];
				mealItems.push({
					id: key,
					...meal
				});
			}

			setMeals(mealItems);
		};

		fetchMeals();
	}, []);

	const mealItems = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes["available-meals"]}>
			<Card>
				<ul>{mealItems}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
