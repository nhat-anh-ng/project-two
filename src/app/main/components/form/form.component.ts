import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe.model';
import { Meal } from '../../enums/meal.enum';
import { RecipeService } from '../../services/recipe.service';
import { RecipesStore } from '../../services/recipes.store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  recipe!: Recipe;
  recipeForm!: FormGroup;
  
  get f() { return this.recipeForm.controls; }

  constructor(private recipeService: RecipeService,private formBuilder: FormBuilder, private recipesStore: RecipesStore,) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required] ),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    img: new FormControl('' ),
    meal: new FormControl(Meal, [Validators.required]),
    })
  }
  
  saveRecipe(): void {
    
  }

  updateRecipe() {
    const changes = this.recipeForm.value;
    this.recipesStore.saveRecipe(this.recipe.id!, changes).subscribe();
  }
}
