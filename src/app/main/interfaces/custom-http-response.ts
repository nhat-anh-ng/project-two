import { Recipe } from "./recipe";

export interface CustomHttpResponse {
    recipes: Recipe[];
    statusCode: number;
    message: string;
    reason: string;
}