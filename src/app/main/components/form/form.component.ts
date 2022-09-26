import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe.model';
import { Meal } from '../../enums/meal.enum';
import { RecipeService } from '../../services/recipe.service';
import { RecipesStore } from '../../services/recipes.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  recipe!: Recipe;
  recipeForm!: FormGroup;
  recipeObj: Recipe = new Recipe();
  
  constructor(private fb: FormBuilder,
    private router: Router,
    private recipesStore: RecipesStore) {
      this.recipeForm = this.fb.group({
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    img: new FormControl('' ),
    meal: new FormControl('LUNCH', [Validators.required]),
    })
     }

  ngOnInit(): void {
    
  }
  
  saveRecipeCard() {
    this.recipeObj.title = this.recipeForm.value.title;
    this.recipeObj.ingredients = this.recipeForm.value.ingredients;
    this.recipeObj.preparation = this.recipeForm.value.preparation;
    this.recipeObj.img = this.recipeForm.value.img;
    this.recipeObj.meal = this.recipeForm.value.meal;
    
    this.recipesStore.saveRecipe(this.recipeObj).subscribe();
    this.recipesStore.loadAllRecipes();
  }
}
