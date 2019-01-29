import { dishesAsMap, getDishesByRestaurant, getRestaurants } from '../restaurantService';

it('get a map of dishes by id', () => {
    const dish = dishesAsMap.get(1);
    expect(dish.id).toEqual(1);
    expect(dish.name).toEqual("Chicken Burger");
})

it('should return all dishes available in a restaurant', () => {
    let result = getDishesByRestaurant('lunch', 'Mc Donalds');
    expect(result.map(dish => dish.name).sort()).toEqual(["Cheese Burger", "Chicken Burger", "Fries", "Ham Burger"]);

    result = getDishesByRestaurant('breakfast', 'Mc Donalds');
    expect(result.map(dish => dish.name).sort()).toEqual(["Egg Muffin"]);

});

it('should return a list of restaurant for a given meal', () => {
    let result = getRestaurants('breakfast');
    expect(result).toEqual(["Mc Donalds", "Olive Garden", "Vege Deli"]);
    
    result = getRestaurants('lunch');
    expect(result).toEqual(["Mc Donalds", "Olive Garden", "Panda Express", "Pizzeria", "Taco Bell", "Vege Deli"]);

    result = getRestaurants('dinner');
    expect(result).toEqual(["BBQ Hut", "Mc Donalds", "Olive Garden", "Panda Express", "Pizzeria", "Taco Bell", "Vege Deli"]);
})
