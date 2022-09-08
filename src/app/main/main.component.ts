import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enums/data-state.enum';
import { AppState } from './interfaces/app-state';
import { Recipe } from './interfaces/recipe';
import { RecipeService } from './services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { Meal } from './enums/meal.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  appState$!: Observable<AppState<Recipe[]>>;
  readonly Meal = Meal;
  readonly DataState = DataState;
  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appState$ = this.recipeService.recipes$
        .pipe(
            map(response => {
                return { dataState: DataState.LOADED, data: response}
            }),
            startWith({ dataState: DataState.LOADING }),
            catchError((error: string) => {
                return of({ dataState: DataState.ERROR, error: error})
            })
        )
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
