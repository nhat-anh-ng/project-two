import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../interfaces/recipe.model';
import { Meal } from '../../enums/meal.enum';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public mealTypes = Object.values(Meal).map(item => String(item));
  recipeForm!: FormGroup;
  recipeObj: Recipe = new Recipe();
  
  get f() { return this.recipeForm.controls; }

  constructor(private recipeService: RecipeService,private formBuilder: FormBuilder) { }

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
    this.recipeObj.title = this.recipeForm.value.title;
    this.recipeObj.ingredients = this.recipeForm.value.ingredients;
    this.recipeObj.preparation = this.recipeForm.value.preparation;
    this.recipeObj.img = this.recipeForm.value.img;
    this.recipeObj.meal = this.recipeForm.value.meal;
    
      this.recipeService.post(this.recipeObj).subscribe(res => {
            this.recipeForm.reset();
            window.location.reload();
          },
          error => {
            this.recipeService.handleError(error);
          }
      )
  }
}
