import { uiActions } from "../slices/uiSlice";
import { mealsActions } from "../slices/mealsSlice";

export const fetchMealsData = () => {
    return async (dispatch) => {
        const fetchMeals = async () => {
            const response = await fetch("https://foodapp-a0f2e-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
            if (!response.ok) {
                throw new Error("Couldn't fetch data...");
            }

            const data = await response.json();

            return data;
        };

        try {
            dispatch(uiActions.setLoading(true));
            const mealsData = await fetchMeals();
            const meals = [];
            for (const key in mealsData) {
                const meal = mealsData[key];
                meals.push({
                    id: key,
                    ...meal,
                });
            }

            dispatch(mealsActions.setMeals(meals));
        } catch (error) {
            dispatch(uiActions.setError(error.message));
        } finally {
            dispatch(uiActions.setLoading(false));
        }
    };
};