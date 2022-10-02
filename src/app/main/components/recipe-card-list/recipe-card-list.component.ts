import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipesStore } from '../../services/recipes.store';

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
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editRecipe(recipe: Recipe){
    const dialogConfig = new MatDialogConfig();
    
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

  deleteRecipeCard(recipe: Recipe){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = recipe;
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig); 
  }
}
