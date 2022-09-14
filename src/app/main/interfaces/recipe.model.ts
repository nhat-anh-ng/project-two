import { Meal } from "../enums/meal.enum";

export class Recipe {
    id?: string | undefined | null;
    title?: string | undefined | null;
    ingredients?: string | undefined | null;
    preparation?: string | undefined | null;
    meal?: Meal | undefined | null;
    img?: string | undefined | null;
}
