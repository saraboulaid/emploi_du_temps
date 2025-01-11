import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FilliereComponent } from './filliere/filliere.component';
import { FormulaireComponent } from './formulaire/formulaire.component'; // Importation du composant FormulaireComponent

const routes: Routes = [
  { path: '', redirectTo: '/dashbord', pathMatch: 'full' },
  {
    path: 'dashbord', component: DashbordComponent, children: [
      { path: 'filiere', component: FilliereComponent, children: [
          { path: 'form', component: FormulaireComponent }, // La route vers form
        ]
      },
    ]
  },
  // { path: 'crud-table/:name', component: CrudTableComponent },
  // { path: 'emploi-du-temps', component: EmploiDuTempsComponent },
  // { path: 'schedule-form', component: ScheduleFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
