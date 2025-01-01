import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CrudTableComponent } from './crud-table/crud-table.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, SidebarComponent, CrudTableComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajouter cette ligne
  bootstrap: [AppComponent],
})
export class AppModule {}
