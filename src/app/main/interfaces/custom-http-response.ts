import { Recipe } from "./recipe";

export interface CustomHttpResponse {
    recipes: Recipe[] | null | undefined;
    statusCode: number;
}