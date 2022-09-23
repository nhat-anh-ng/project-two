import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipesStore } from '../../services/recipes.store';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements AfterViewInit {
  editForm!: FormGroup;
  recipe!: Recipe;

  constructor(
    private fb: FormBuilder,
    private recipesStore: RecipesStore,
    private dialogRef:  MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) recipe:Recipe) {
      this.recipe = recipe;

      this.editForm = fb.group({
        title: [recipe.title, Validators.required],
        img: [recipe.img, Validators.required],
        ingredients: [recipe.ingredients, Validators.required],
        preparation: [recipe.preparation, Validators.required],
        meal: [recipe.meal, Validators.required]
      })
    }

  ngAfterViewInit() {}

  updateRecipe() {
    const changes = this.editForm.value;
    this.recipesStore.saveRecipe(this.recipe.id!, changes).subscribe();

    this.dialogRef.close(changes);
  }

  close() {
        this.dialogRef.close();
    }

}
