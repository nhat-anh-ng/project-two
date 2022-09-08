import { Meal } from "../enums/meal.enum";

export interface Recipe {
    id: number;
    title: string;
    ingredients: string;
    preparation: string;
    meal: Meal;
    img?: string;
}
