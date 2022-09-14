import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { Meal } from '../../enums/meal.enum';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  recipes!: Recipe[];
  recipe!: Recipe;
  recipeObj: Recipe = new Recipe();
  filteredSubject = new BehaviorSubject<Meal>(Meal.ALL);
  filteredMeal$ = this.filteredSubject.asObservable();
  meal!: Meal;
  iconTypes = [
      {icon: "brightness_5"},
      {icon: "brightness_7"},
      {icon: "brightness_4"},
      {icon: "widgets"},
      {icon: "local_drink"},
    ]
    
  public mealTypes = Object.values(Meal).map(item => String(item));
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes$ = this.recipeService.get();
  }

  @Output() messageEvent = new EventEmitter<string>();
  filterByMeal(meal: Meal) {
    
    this.filteredSubject.next(meal);
    this.recipeService.filter$(meal, this.recipes);
    this.recipes$ = this.recipeService.get();
    console.log(this.recipes)
     this.messageEvent.emit('ih')
  }

}
