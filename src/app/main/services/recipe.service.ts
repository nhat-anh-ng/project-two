import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from '../interfaces/custom-http-response';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly server = 'http://localhost:3000/recipes';
  recipes: Recipe[] = [];
  constructor(private http: HttpClient) { }

  getRecipes$ = <Observable<Recipe[]>>this.http.get<Recipe[]>
    (`${this.server}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
  );

  getRecipe$ = (id: string) => <Observable<Recipe>>this.http.get<Recipe>
    (`${this.server}/${id}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        )

  post$ = (recipe: Recipe) => <Observable<Recipe>>this.http.post<Recipe>
    (`${this.server}`, recipe)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (recipe: Recipe, id: number) => <Observable<Recipe>>this.http.put<Recipe>
      (`${this.server}/update/${id}`, recipe)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        )

  delete$ = (id: number) => <Observable<Recipe>>this.http.delete<Recipe>
      (`${this.server}/delete/${id}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        )

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
