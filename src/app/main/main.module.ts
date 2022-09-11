import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from "./components/form/form.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RecipeCardComponent } from "./components/recipe-card/recipe-card.component";





@NgModule({
  declarations: [MainComponent, FormComponent, SidebarComponent, RecipeCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }