import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private recipeService: RecipeService, public dialog: MatDialog, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    

/*
const recipeId = parseInt(this.route.snapshot.paramMap.get("recipeId")!);
    const recipe$ = this.recipeService.loadRecipeById(recipeId)
      .pipe(startWith(null));
    
    recipe$.pipe(
      map((recipe) => {
        return {
          recipe
        }
      })
    )
    
    this.recipes$ = this.recipeService.get();
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges;
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.filteredRecipe$ = combineLatest(this.recipes$, this.filter$).pipe(
    map(([dorms, filter]) => dorms.filter(dorms => dorms.ingredients?.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
    );
   */
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
  
}
