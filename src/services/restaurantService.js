import json from '../data/dishes.json';

const restaurantsMemoizer = new Map();
export function getRestaurants(meal: string) {
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

// TODO change with lunch, dinner, ...
export function getDishesByRestaurant(selectedMeal: string, selectedRestaurant: string) {
    return json.dishes.filter(dish => dish.restaurant === selectedRestaurant && dish.availableMeals.includes(selectedMeal));
}

// create a map between id -> dish in case the json contains more information than the name in the future
export const dishesAsMap = json.dishes.reduce((result, next) => {
    result.set(next.id, next);
    return result;
}, new Map())

export default json;
