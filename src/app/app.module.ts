import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';

import { ReactiveFormsModule } from '@angular/forms'; // Importer ce module
@NgModule({
  declarations: [AppComponent, AuthComponent, SidebarComponent, CrudTableComponent, EmploiDuTempsComponent, ScheduleFormComponent],
  imports: [BrowserModule,MatSelectModule ,MatButtonModule, AppRoutingModule, FormsModule,MatTableModule, BrowserAnimationsModule,MatPaginatorModule, MatInputModule,MatIconModule , ReactiveFormsModule,],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajouter cette ligne
  bootstrap: [AppComponent],
})
export class AppModule {}
