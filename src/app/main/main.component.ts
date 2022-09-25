import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';

import { AppState } from './interfaces/app-state';
import { Recipe, sortRecipesBySeqNo } from './interfaces/recipe.model';
import { RecipeService } from './services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from './enums/meal.enum';
import { NgForm } from '@angular/forms';
import { DataState } from './enums/data-state.enum';
import { FormComponent } from './components/form/form.component';
import { RecipesStore } from './services/recipes.store';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  breakfastRecipes$!: Observable<Recipe[]>;
  lunchRecipes$!: Observable<Recipe[]>;
  dinnerRecipes$!: Observable<Recipe[]>;
  dessertsRecipes$!: Observable<Recipe[]>;
  drinksRecipes$!: Observable<Recipe[]>;
  
  constructor(public dialog: MatDialog, private recipesStore: RecipesStore, private recipesService: RecipeService) { }

  ngOnInit(): void {
    this.reloadRecipes()
    this.recipesService.loadAllRecipes()
      .pipe(
        map(recipes => recipes.sort(sortRecipesBySeqNo))
      )

  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  message!:string;

  receiveMessage($event: any) {
    this.message = $event
  }

  reloadRecipes() {
    this.breakfastRecipes$ = this.recipesStore.filterByMeal("BREAKFAST");
    this.lunchRecipes$ = this.recipesStore.filterByMeal("LUNCH");
    this.dinnerRecipes$ = this.recipesStore.filterByMeal("DINNER");
    this.dessertsRecipes$ = this.recipesStore.filterByMeal("DESSERTS"); 
    this.drinksRecipes$ = this.recipesStore.filterByMeal("DRINKS");  
  }


}
