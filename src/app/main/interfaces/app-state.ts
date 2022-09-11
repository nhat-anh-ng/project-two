import { DataState } from "../enums/data-state.enum";
import { Recipe } from "./recipe";

export interface AppState<T> {
    dataState: DataState;
    data?: T | null | undefined;
    error?: string;
}

