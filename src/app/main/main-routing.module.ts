import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./components/form/form.component";
import { RecipeCardComponent } from "./components/recipe-card/recipe-card.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: ':id',
    component: RecipeCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }