import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { Recipe } from '../interfaces/recipe.model';
import { RecipesStore } from '../services/recipes.store';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe, private recipesStore: RecipesStore) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete(recipe: Recipe){
    this.recipesStore.loadAllRecipes()
    this.recipesStore.deleteRecipe(recipe.id!).subscribe();
    this.recipesStore.loadAllRecipes()
    this.dialogRef.close();
  }
}
