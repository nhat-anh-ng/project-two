import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
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
  public mealTypes = Object.values(Meal).map(item => String(item));
  iconTypes = [
      {icon: "brightness_5"},
      {icon: "brightness_7"},
      {icon: "brightness_4"},
      {icon: "widgets"},
      {icon: "local_drink"},
    ]
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes$ = this.recipeService.get();
  }
}
