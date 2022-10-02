import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipesStore } from '../../services/recipes.store';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  recipe!: Recipe;
  recipeForm!: FormGroup;
  recipeObj: Recipe = new Recipe();
  showMessage = false;
  
  constructor(private fb: FormBuilder, private recipesStore: RecipesStore) {
    
    this.recipeForm = this.fb.group({
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    img: new FormControl('' ),
    meal: new FormControl('', [Validators.required]),
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
    this.showMessage = true
    this.recipeForm.reset();
  }

  onClose() {
    this.showMessage = false;
    this.recipesStore.loadAllRecipes();
  }
}
