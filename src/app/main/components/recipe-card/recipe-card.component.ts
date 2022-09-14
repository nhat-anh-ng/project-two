import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataState } from '../../enums/data-state.enum';
import { Meal } from '../../enums/meal.enum';
import { AppState } from '../../interfaces/app-state';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  recipeForm!: FormGroup;
  public mealTypes = Object.values(Meal).map(item => String(item));
  recipeObj: Recipe = new Recipe();
  
  constructor(private recipeService: RecipeService, public dialog: MatDialog, private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required] ),
    img: new FormControl(''),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    meal: new FormControl(Meal, [Validators.required]),
  })
    this.recipes$ = this.recipeService.get();
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.delete(recipe.id!).subscribe(res => {
      this.recipes$ = this.recipeService.get();
    })
  }

  editRecipe(recipe: Recipe){
    this.recipeObj.id = recipe.id;
    this.recipeForm.controls['title'].setValue(recipe.title);
    this.recipeForm.controls['img'].setValue(recipe.img);
    this.recipeForm.controls['ingredients'].setValue(recipe.ingredients);
    this.recipeForm.controls['preparation'].setValue(recipe.preparation);
    this.recipeForm.controls['meal'].setValue(recipe.meal);
  }

  updateRecipe(){
    this.recipeObj.title = this.recipeForm.value.title;
    this.recipeObj.ingredients = this.recipeForm.value.ingredients;
    this.recipeObj.img = this.recipeForm.value.img;
    this.recipeObj.preparation = this.recipeForm.value.preparation;
    this.recipeObj.meal = this.recipeForm.value.meal;
    this.recipeService.update(this.recipeObj, this.recipeObj.id!).subscribe(res => {
            this.recipes$ = this.recipeService.get();
          },
          error => {
            this.recipeService.handleError(error);
          }
      )
  }
}
