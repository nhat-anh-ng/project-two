import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

import { Recipe } from './interfaces/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { RecipesStore } from './services/recipes.store';
import { DOCUMENT, ViewportScroller } from '@angular/common';

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
  top!:void;
  constructor(public dialog: MatDialog, private recipesStore: RecipesStore) { }

  ngOnInit(): void {
    this.reloadRecipes()
     
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  reloadRecipes() {
    this.breakfastRecipes$ = this.recipesStore.filterByMeal("BREAKFAST");
    this.lunchRecipes$ = this.recipesStore.filterByMeal("LUNCH");
    this.dinnerRecipes$ = this.recipesStore.filterByMeal("DINNER");
    this.dessertsRecipes$ = this.recipesStore.filterByMeal("DESSERTS"); 
    this.drinksRecipes$ = this.recipesStore.filterByMeal("DRINKS");  
  }

  scrollToTopMsg($event: any): void {
    this.top = $event
  }

}

/*
this.recipesService.loadAllRecipes()
      .pipe(
        map(recipes => recipes.sort(sortRecipesBySeqNo))
      )
*/