import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults$!: Observable<Recipe[]>;
  filter!: FormControl;
  filter$!: Observable<string>;
  filteredStates$!: Observable<Recipe[]>;
  
  constructor(private recipeService: RecipeService, private http: HttpClient) {   
  }

  ngOnInit(): void {
    this.onSearch()
    
  }
  onSearch(){
    this.searchResults$ = this.recipeService.searchRecipes(),
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges;
    this.filteredStates$ = combineLatest(this.searchResults$, this.filter$).pipe(
    map(([recipes, filterString]) => 
    recipes.filter(recipe => 
      recipe.ingredients?.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 
    )),
  );
  }

}
