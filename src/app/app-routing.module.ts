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
import {FiliereFormComponent} from "./filiere-form/filiere-form.component";
import {FormProfComponent} from "./form-prof/form-prof.component";
import {FormMatiereComponent} from "./form-matiere/form-matiere.component";
import { FormTypeSceanceComponent } from './form-type-sceance/form-type-sceance.component';
import {FormSalleComponent} from "./form-salle/form-salle.component";
import {FormDurationComponent} from "./form-duration/form-duration.component";
import { AuthComponent } from './auth/auth.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CategorieFormComponent } from './categorie-form/categorie-form.component';
import { AssignProfFormComponent } from './assign-prof-form/assign-prof-form.component';
import { ProfMatieresComponent } from './prof-matieres/prof-matieres.component';

const routes: Routes = [
  { path: 'filiere', component: FilliereComponent, canActivate: [AuthGuard] },
  { path: 'profs', component: ProfsComponent, canActivate: [AuthGuard] },
  { path: 'matieres', component: MatieresComponent, canActivate: [AuthGuard] },
  { path: 'type_seance', component: TypeSeanceComponent, canActivate: [AuthGuard] },
  { path: 'salles', component: SallesComponent, canActivate: [AuthGuard] },
  { path: 'categorie', component: CategorieComponent, canActivate: [AuthGuard] },
  { path: 'duration', component: DurationComponent, canActivate: [AuthGuard] },
  { path: 'emploi-du-temps', component: EmploiDuTempsComponent, canActivate: [AuthGuard] },
  { path: 'schedule-form', component: ScheduleFormComponent, canActivate: [AuthGuard] },


  { path: 'filiere/form', component: FiliereFormComponent , canActivate: [AuthGuard] },
  { path: 'filiere/edit/:id', component: FiliereFormComponent , canActivate: [AuthGuard] },


  { path: 'profs/form', component: FormProfComponent , canActivate: [AuthGuard] },
  { path: 'profs/edit/:id', component: FormProfComponent , canActivate: [AuthGuard] },


  { path: 'matieres/form', component: FormMatiereComponent , canActivate: [AuthGuard] },
  { path: 'matieres/edit/:id', component: FormMatiereComponent , canActivate: [AuthGuard] },


  { path: 'type_seance/form', component: FormTypeSceanceComponent, canActivate: [AuthGuard]  },
  { path: 'type_seance/edit/:id', component: FormTypeSceanceComponent , canActivate: [AuthGuard] },


  { path: 'salles/form', component: FormSalleComponent, canActivate: [AuthGuard]  },
  { path: 'salles/edit/:id', component: FormSalleComponent, canActivate: [AuthGuard] },

  { path: 'categorie/form', component: CategorieFormComponent , canActivate: [AuthGuard] },
  { path: 'categorie/edit/:id', component: CategorieFormComponent , canActivate: [AuthGuard] },


  { path: 'duration/form', component: FormDurationComponent, canActivate: [AuthGuard]  },
  { path: 'duration/edit/:id', component: FormDurationComponent , canActivate: [AuthGuard] },

  { path: 'assign-matiere/:id', component: AssignProfFormComponent , canActivate: [AuthGuard] },
  { path: 'profs/:id/matieres', component: ProfMatieresComponent , canActivate: [AuthGuard] },

  { path: 'schedule/edit/:id', component: ScheduleFormComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: AuthComponent },  // Ajouter une page de connexion
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Rediriger vers la page de connexion par défaut

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
