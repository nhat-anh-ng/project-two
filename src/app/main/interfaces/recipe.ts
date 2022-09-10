import { Meal } from "../enums/meal.enum";

export interface Recipe {
    id?: number | undefined | null;
    title?: string | undefined | null;
    ingredients?: string | undefined | null;
    preparation?: string | undefined | null;
    meal?: typeof Meal | undefined | null;
    img?: string | undefined | null;
}
