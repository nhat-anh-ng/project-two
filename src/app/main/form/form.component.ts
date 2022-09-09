import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Meal } from '../enums/meal.enum';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  readonly Meal = typeof Meal;
  public mealTypes = Object.values(Meal);

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
  })

  get f() { return this.recipeForm.controls; }
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  
  saveRecipe() {
    if(this.recipeForm.valid) {
      this.recipeService.save$(this.recipeForm.value).subscribe(res => {
        this.recipeForm.reset();
      })
    }
  }
}
