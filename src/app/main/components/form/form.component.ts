import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../../enums/data-state.enum';
import { Meal } from 'src/app/main/enums/meal.enum';

import { AppState } from '../../interfaces/app-state';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { CustomHttpResponse } from '../../interfaces/custom-http-response';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  appState$: Observable<AppState<CustomHttpResponse>> | undefined;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomHttpResponse | undefined>(undefined);
  readonly Meal = Meal;
  public mealTypes = Object.values(Meal).map(item => String(item));
  response!: CustomHttpResponse
  
  
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    meal: new FormControl(Meal, [Validators.required]),
  })

  get f() { return this.recipeForm.controls; }
  constructor(private recipeService: RecipeService) { }
  ngOnInit(): void {}
  
  saveRecipe(): void {
    /** 
    if(this.recipeForm.valid) {
      this.recipeService.save$(this.recipeForm.value).subscribe(res => {
        this.recipeForm.reset();
      })
    } */
    this.appState$ = this.recipeService.save$(this.recipeForm.value)
      .pipe(
        map(response => {
          this.dataSubject.next(<CustomHttpResponse>{...this.dataSubject.value, recipes: [response.recipes![0]], ...this.dataSubject!.value!.recipes});
          this.recipeForm.reset();
          return { dataState: DataState.LOADED, data: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED, data:this.dataSubject.value }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error})
        })
      )
  }
}
