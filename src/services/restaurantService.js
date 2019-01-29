import json from '../data/dishes.json';

import type { MealType } from '../types';

const restaurantsMemoizer = new Map();
export function getRestaurants(meal: MealType) {
    let restaurants = restaurantsMemoizer.get(meal);
    if (!restaurants) {
        const restaurantSets = new Set();
        json.dishes.filter(dish => dish.availableMeals.includes(meal)).forEach(dish => {
            restaurantSets.add(dish.restaurant);
        });
        restaurants = Array.from(restaurantSets).sort();
        restaurantsMemoizer.set(meal, restaurants);
    }
    return restaurants;
}

export function getDishesByRestaurant(selectedMeal: MealType, selectedRestaurant: string) {
    return json.dishes.filter(dish => dish.restaurant === selectedRestaurant && dish.availableMeals.includes(selectedMeal));
}

// create a map between id -> dish in case the json contains more information than the name in the future
export const dishesAsMap = json.dishes.reduce((result, next) => {
    result.set(next.id, next);
    return result;
}, new Map())

export default json;
