import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Meal } from '../../enums/meal.enum';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrls: ['./recipe-card-list.component.scss']
})
export class RecipeCardListComponent implements OnInit {
  @Input()
  recipes: Recipe[] | null = [];
  @Output()
  private recipesChanged = new EventEmitter();

  recipes$!: Observable<Recipe[]>;
  recipeForm!: FormGroup;
  mealType!: FormGroup;
  public mealTypes = Object.values(Meal).map(item => String(item));
  recipeObj: Recipe = new Recipe();

  filteredRecipe$!: Observable<Recipe[]>;
  filter!: FormControl;
  filter$!: Observable<string>;


  constructor(private recipeService: RecipeService, public dialog: MatDialog, private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.recipes$ = this.recipeService.get();
     
    this.recipeForm = this.formBuilder.group({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required] ),
    img: new FormControl(''),
    ingredients: new FormControl('', [Validators.required]),
    preparation: new FormControl('', [Validators.required]),
    meal: new FormControl(Meal, [Validators.required]),
    })

    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges;
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredRecipe$ = combineLatest(this.recipes$, this.filter$).pipe(
    map(([dorms, filter]) => dorms.filter(dorms => dorms.ingredients?.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
    );
   
  }

  editRecipe(recipe: Recipe){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = recipe;
    const dialogRef = this.dialog.open(EditFormComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.recipesChanged.emit())
      ).subscribe();
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.delete(recipe.id!).subscribe(res => {
      this.recipes$ = this.recipeService.get();
    })
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
