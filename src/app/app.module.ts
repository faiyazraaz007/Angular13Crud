import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from  '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortHeader, MatSortModule} from '@angular/material/sort';
import { NgToastModule } from 'ng-angular-popup';
import { HeaderComponent } from './header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import {MatDividerModule} from '@angular/material/divider';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';










@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    HeaderComponent,
    ProductListComponent,
    CategoryListComponent,
    DashboardComponent,
    SidebarMenuComponent,
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgToastModule,
    MatSidenavModule,
    MatDividerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
