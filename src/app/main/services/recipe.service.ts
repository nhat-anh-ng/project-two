import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { Meal } from '../enums/meal.enum';
import { Recipe} from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipe!: Recipe[];
  public readonly server = 'http://localhost:3000/foodapp';

  constructor(private http: HttpClient) { }

  loadAllRecipes(): Observable<Recipe[]>{
        return this.http.get<Recipe[]>("/foodapp")
            .pipe(
                map((res) => res),
                shareReplay()
            );
    }

  loadRecipeById(recipeId: string) {
        return this.http.get<Recipe>(`${this.server}/${recipeId}`)
            .pipe(
                shareReplay()
            );
  }

  searchRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.server}`).pipe(
      map(res => res),
      shareReplay()
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error - ${error.error.message}`
    } else {
      errorMessage = `An error has occured - Code:${error.status}`
    }
    return throwError(errorMessage)
  } 
}

