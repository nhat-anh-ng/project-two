import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from '../../enums/data-state.enum';
import { AppState } from '../../interfaces/app-state';
import { Recipe } from '../../interfaces/recipe';
import { RecipeService } from '../../services/recipe.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  appState$!: Observable<AppState<Recipe[]>>;
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<Recipe[] | undefined>(undefined);
  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appState$ = this.recipeService.recipes$
        .pipe(
            map(response => {
              this.dataSubject.next(response);
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
