import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'foodapp',
    pathMatch: 'full'
  },
  {
    path: 'foodapp',
    loadChildren: () => import('./main/main.module').then( d => d.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }