import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject,Observable } from 'rxjs';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from '../../interfaces/app-state';
import { CustomHttpResponse } from '../../interfaces/custom-http-response';
import { DataState } from '../../enums/data-state.enum';
import { Recipe } from '../../interfaces/recipe';
import { Meal } from '../../enums/meal.enum';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  readonly Meal = Meal;
  public mealTypes = Object.values(Meal).map(item => String(item));
  
  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    meal: new FormControl(Meal, [Validators.required]),
  })

  get f() { return this.recipeForm.controls; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public cardData: Recipe,
    private recipeService: RecipeService, ) { }

  ngOnInit(): void {}
  
  saveRecipe(): void {
    if (this.recipeForm.valid) {
      this.recipeService.post$(this.recipeForm.value).subscribe({
          next:() => {
            this.recipeForm.clearAsyncValidators();
            window.location.reload();
          },
          error: error => {
            this.recipeService.handleError(error)
          }
        })
    }
  }

  updateRecipe(): void {
    
  }

  dataForm(): void {
    if(this.cardData) {
     this.recipeForm.controls['title'].setValue(this.cardData.title!);
     this.recipeForm.controls['ingredients'].setValue(this.cardData.ingredients!);
     this.recipeForm.controls['preparation'].setValue(this.cardData.preparation!);
     this.recipeForm.controls['meal'].setValue(this.cardData.meal!);
    }
  }
}
