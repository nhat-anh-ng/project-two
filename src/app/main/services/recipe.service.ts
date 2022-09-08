import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly server = 'http://localhost:3000/recipes';
  recipes: Recipe[] = [];
  constructor(private http: HttpClient) { }

  recipes$ = <Observable<Recipe[]>>this.http.get<Recipe[]>
    (`${this.server}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  save$ = (recipe: Recipe) => <Observable<Recipe[]>>this.http.post<Recipe[]>
    (`${this.server}/add`, recipe)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  update$ = (recipe: Recipe) => <Observable<Recipe[]>>this.http.put<Recipe[]>
      (`${this.server}/update/`, recipe)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        )

  delete$ = (recipeId: number) => <Observable<Recipe[]>>this.http.delete<Recipe[]>
      (`${this.server}/delete/${recipeId}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        )

  private handleError(error: HttpErrorResponse): Observable<never> {
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
