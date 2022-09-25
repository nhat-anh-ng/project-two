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
import {MatTabsModule} from '@angular/material/tabs';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from "./components/form/form.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { RecipeCardListComponent } from "./components/recipe-card-list/recipe-card-list.component";
import { EditFormComponent } from './components/edit-form/edit-form.component';







@NgModule({
  declarations: [MainComponent, FormComponent, SidebarComponent, RecipeCardListComponent, EditFormComponent],
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
    ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class MainModule { }