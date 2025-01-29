import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { ReactiveFormsModule } from '@angular/forms';

import { MatieresComponent } from './matieres/matieres.component';
import { ProfsComponent } from './profs/profs.component';
import { SallesComponent } from './salles/salles.component';
import { DurationComponent } from './duration/duration.component';
import { TypeSeanceComponent } from './type-seance/type-seance.component';
import { FiliereFormComponent } from './filiere-form/filiere-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CommonModule } from '@angular/common';

import { FormProfComponent } from './form-prof/form-prof.component';
import { FormDurationComponent } from './form-duration/form-duration.component';
import { FormSalleComponent } from './form-salle/form-salle.component';
import { FormTypeSceanceComponent } from './form-type-sceance/form-type-sceance.component';
import { FormMatiereComponent } from './form-matiere/form-matiere.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { AssignProfFormComponent } from './assign-prof-form/assign-prof-form.component';
import { ProfMatieresComponent } from './prof-matieres/prof-matieres.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, SidebarComponent, CrudTableComponent, EmploiDuTempsComponent, ScheduleFormComponent,DurationComponent],
  imports: [BrowserModule,MatSelectModule ,MatButtonModule, CommonModule, AppRoutingModule, FormsModule,MatTableModule, BrowserAnimationsModule,MatPaginatorModule, MatInputModule,MatIconModule , ReactiveFormsModule, HttpClientModule, CategorieComponent, CategorieFormComponent, AssignProfFormComponent, ProfMatieresComponent ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Enregistrer l'intercepteur ici
      multi: true                // Permet d'ajouter plusieurs intercepteurs
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
