import { Recipe } from "./recipe.model";

export interface CustomHttpResponse {
    recipes: Recipe[] | null | undefined;
    statusCode: number;
}