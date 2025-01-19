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

const routes: Routes = [

  { path: 'filiere', component: FilliereComponent },
  { path: 'profs', component: ProfsComponent},
  { path: 'matieres', component: MatieresComponent },
  { path: 'type_seance', component: TypeSeanceComponent },
  { path: 'salles', component: SallesComponent },
  { path: 'duration', component: DurationComponent },
  { path: 'emploi-du-temps', component: EmploiDuTempsComponent },
  { path: 'schedule-form', component: ScheduleFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
