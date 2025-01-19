import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { FilliereComponent } from './filliere/filliere.component';
import { ProfsComponent } from './profs/profs.component';
import { MatieresComponent } from './matieres/matieres.component';
import { TypeSeanceComponent } from './type-seance/type-seance.component';
import { SallesComponent } from './salles/salles.component';
import { DurationComponent } from './duration/duration.component';
import { AuthGuard } from './auth.guard';  // Importer le guard
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'filiere', component: FilliereComponent, canActivate: [AuthGuard] },
  { path: 'profs', component: ProfsComponent, canActivate: [AuthGuard] },
  { path: 'matieres', component: MatieresComponent, canActivate: [AuthGuard] },
  { path: 'type_seance', component: TypeSeanceComponent, canActivate: [AuthGuard] },
  { path: 'salles', component: SallesComponent, canActivate: [AuthGuard] },
  { path: 'duration', component: DurationComponent, canActivate: [AuthGuard] },
  { path: 'emploi-du-temps', component: EmploiDuTempsComponent, canActivate: [AuthGuard] },
  { path: 'schedule-form', component: ScheduleFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },  // Ajouter une page de connexion
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Rediriger vers la page de connexion par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
