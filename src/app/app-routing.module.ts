import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';

import { FilliereComponent } from './filliere/filliere.component';
import { ProfsComponent } from './profs/profs.component';
import { MatieresComponent } from './matieres/matieres.component';
import { TypeSeanceComponent } from './type-seance/type-seance.component';
import { SallesComponent } from './salles/salles.component';
import { DurationComponent } from './duration/duration.component';
import {FiliereFormComponent} from "./filiere-form/filiere-form.component";
import {FormProfComponent} from "./form-prof/form-prof.component";
import {FormMatiereComponent} from "./form-matiere/form-matiere.component";
import {FormTypeSceanceComponent} from "./form-type-sceance/form-type-sceance.component";
import {FormSalleComponent} from "./form-salle/form-salle.component";
import {FormDurationComponent} from "./form-duration/form-duration.component";
const routes: Routes = [
  { path: 'filiere', component: FilliereComponent },
  { path: 'filiere/form', component: FiliereFormComponent },
  { path: 'filiere/edit/:id', component: FiliereFormComponent },

  { path: 'profs', component: ProfsComponent },
  { path: 'profs/form', component: FormProfComponent },
  { path: 'profs/edit/:id', component: FormProfComponent },

  { path: 'matieres', component: MatieresComponent },
  { path: 'matieres/form', component: FormMatiereComponent },
  { path: 'matieres/edit/:id', component: FormMatiereComponent },

  { path: 'type_seance', component: TypeSeanceComponent },
  { path: 'type_seance/form', component: FormTypeSceanceComponent },
  { path: 'type_seance/edit/:id', component: FormTypeSceanceComponent },

  { path: 'salles', component: SallesComponent },
  { path: 'salles/form', component: FormSalleComponent },
  { path: 'salles/edit/:id', component: FormSalleComponent },

  { path: 'duration', component: DurationComponent },
  { path: 'duration/form', component: FormDurationComponent },
  { path: 'duration/edit/:id', component: FormDurationComponent },

  { path: 'emploi-du-temps', component: EmploiDuTempsComponent },
  { path: 'schedule-form', component: ScheduleFormComponent },
  { path: 'schedule/edit/:id', component: ScheduleFormComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
