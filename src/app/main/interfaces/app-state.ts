import { DataState } from "../enums/data-state.enum";
import { Recipe } from "./recipe.model";

export interface AppState<T> {
    dataState: DataState;
    data?: T | null | undefined;
    error?: string;
}

