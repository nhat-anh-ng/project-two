import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from '../interfaces/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly server = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  post(recipe: Recipe) {
    return this.http.post<Recipe>(`${this.server}`, recipe).pipe(
      map((res) => {
        return res
      }),
      catchError(this.handleError)
    )
  }

  get() {
    return this.http.get<Recipe[]>(`${this.server}`).pipe(
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


/**
 post$ = (recipe: Recipe) => <Observable<Recipe>>this.http.post<Recipe>
    (`${this.server}`, recipe)
      .pipe(map(res: any) => {
        return res;
      }
      catchError(this.handleError)
      );

  getRecipes$ = <Observable<Recipe[]>>this.http.get<Recipe[]>
    (`${this.server}`)
      .pipe(
        catchError(this.handleError)
  );

  getRecipe$ = (id: string) => <Observable<Recipe>>this.http.get<Recipe>
    (`${this.server}/${id}`)
        .pipe(
          catchError(this.handleError)
        )

  post$ = (recipe: Recipe) => <Observable<Recipe>>this.http.post<Recipe>
    (`${this.server}`, recipe)
      .pipe(
        catchError(this.handleError)
      );

  update$ = (recipe: Recipe, id: string) => <Observable<Recipe>>this.http.put<Recipe>
      (`${this.server}/${id}`, recipe)
        .pipe(
          catchError(this.handleError)
        )

  delete$ = (id: string) => <Observable<Recipe>>this.http.delete<Recipe>
      (`${this.server}/${id}`)
        .pipe(
          catchError(this.handleError)
        )
 */