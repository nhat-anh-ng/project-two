import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, Subscriber, throwError } from 'rxjs';
import { Meal } from '../enums/meal.enum';
import { Recipe, Recipes } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipe!: Recipe[];
  public readonly server = 'http://localhost:3000/foodapp';

  constructor(private http: HttpClient) { }

  loadAllRecipes(): Observable<Recipe[]>{
        return this.http.get<Recipes>("/foodapp")
            .pipe(
                map(res => res["foodapp"]),
                shareReplay()
            );
    }

  loadRecipeById(recipeId: number) {
        return this.http.get<Recipe>(`${this.server}/${recipeId}`)
            .pipe(
                shareReplay()
            );
  }

  post(recipe: Recipe) {
    return this.http.post<Recipe>(`${this.server}`, recipe).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  get() {
    return this.http.get<Recipe[]>(`${this.server}/foodapp`).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  update(recipe: Recipe, id: string) {
    return this.http.put<Recipe>(`${this.server}/${id}`, recipe).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  delete(id: string) {
    return this.http.delete<Recipe>(`${this.server}/${id}`).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  filter$ = (meal:Meal, data: Recipe[]) => <Observable<Recipe[]>>
  new Observable<Recipe[]>(subscriber => {
    subscriber.next(meal === Meal.ALL ? data :
      <Recipe[]>{
        ...data,
        recipe: data.filter(recipe => recipe.meal === meal)
      });
      subscriber.complete();
  })


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

