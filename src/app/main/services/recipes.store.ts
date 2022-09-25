import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, filter, catchError, tap, shareReplay } from "rxjs/operators";
import { Recipe, Recipes, sortRecipesBySeqNo } from "../interfaces/recipe.model";

@Injectable({
    providedIn: 'root'
})

export class RecipesStore {
    private subject = new BehaviorSubject<Recipe[]>([]);
    recipes$: Observable<Recipe[]> = this.subject.asObservable();
public readonly server = 'http://localhost:3000/foodapp';
    constructor(
        private http: HttpClient
    ){
        this.loadAllRecipes();
    }

     private loadAllRecipes() {
        
        const loadRecipes$ = this.http.get<Recipe[]>(`${this.server}`)
            .pipe(
                map((res) => res),
                tap(recipes => this.subject.next(recipes))
            );
        loadRecipes$.subscribe();
    }

    filterByMeal(meal: string): Observable<Recipe[]> {
        return this.recipes$
            .pipe(
                map(recipes => 
                    recipes?.filter(recipe => recipe.meal == meal && recipe !== null).sort(sortRecipesBySeqNo)
                )
            )
    }

    saveRecipe(recipeId: string, changes: Partial<Recipe>): Observable<any>{
        const recipes = this.subject.getValue();
        const index = recipes.findIndex(recipe => recipe.id == recipeId);
        const newRecipe: Recipe = {
            ...recipes[index],
            ...changes
        };

        const newRecipes: Recipe[] = recipes.slice(0);
        newRecipes[index] = newRecipe;

        this.subject.next(newRecipes);

        return this.http.put(`/foodapp/${recipeId}`, changes)
            .pipe(
                shareReplay()
            );
    }
}

/*
https://project-8e7f1-default-rtdb.europe-west1.firebasedatabase.app/
*/