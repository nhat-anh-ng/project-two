import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

import { AppState } from './interfaces/app-state';
import { Recipe } from './interfaces/recipe';
import { RecipeService } from './services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from './enums/meal.enum';
import { NgForm } from '@angular/forms';
import { DataState } from './enums/data-state.enum';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
