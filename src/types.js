export type SelectedDishType = {
    id: string,
    dishId: "" | number,
    count: number,
}

export type MealType = "breakfast" | "lunch" | "dinner";
export type FormState = {
    step: number,
    selectedMeal: MealType,
    peopleCount: number,
    selectedRestaurant: string,
    selectedDishes: Array<SelectedDishType>,
  };
  