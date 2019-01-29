import { dishesAsMap, getDishesByRestaurant, getRestaurants } from '../restaurantService';

it('get a map of dishes by id', () => {
    let dish = dishesAsMap.get(1);
    expect(dish.id).toEqual(1);
    expect(dish.name).toEqual("Chicken Burger");

    dish = dishesAsMap.get(7);
    expect(dish.id).toEqual(7);
    expect(dish.name).toEqual("Tacos");
});

it('should return all dishes available in a specific restaurant for a given meal', () => {
    let result = getDishesByRestaurant('lunch', 'Mc Donalds');
    expect(result.map(dish => dish.name).sort()).toEqual(["Cheese Burger", "Chicken Burger", "Fries", "Ham Burger"]);

    result = getDishesByRestaurant('breakfast', 'Mc Donalds');
    expect(result.map(dish => dish.name).sort()).toEqual(["Egg Muffin"]);

});

it('should return an ordered list of restaurant for a given meal', () => {
    let result = getRestaurants('breakfast');
    expect(result).toEqual(["Mc Donalds", "Olive Garden", "Vege Deli"]);
    
    result = getRestaurants('lunch');
    expect(result).toEqual(["Mc Donalds", "Olive Garden", "Panda Express", "Pizzeria", "Taco Bell", "Vege Deli"]);

    result = getRestaurants('dinner');
    expect(result).toEqual(["BBQ Hut", "Mc Donalds", "Olive Garden", "Panda Express", "Pizzeria", "Taco Bell", "Vege Deli"]);
});
