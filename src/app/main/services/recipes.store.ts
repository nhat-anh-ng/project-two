import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { Recipe, sortRecipesBySeqNo } from "../interfaces/recipe.model";

@Injectable({
    providedIn: 'root'
})
export class RecipesStore {
    private subject = new BehaviorSubject<Recipe[]>([]);
    recipes$: Observable<Recipe[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient
    ){
        this.loadAllCourses();
    }

     private loadAllCourses() {
       const loadCourses$ = this.http.get<Recipe[]>('/')
            .pipe(
                map(res => res),
                tap(courses => this.subject.next(courses))
            );
    }

    filterByMeal(meal: string): Observable<Recipe[]> {
        return this.recipes$
            .pipe(
                map(recipes => 
                    recipes.filter(recipe => recipe.meal == meal).sort(sortRecipesBySeqNo)
                )
            )
    }
}