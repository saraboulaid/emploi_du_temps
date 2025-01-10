import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTableComponent } from './crud-table/crud-table.component';
import { EmploiDuTempsComponent } from './emploi-du-temps/emploi-du-temps.component';
import {ScheduleFormComponent} from './schedule-form/schedule-form.component';
const routes: Routes = [
  { path: 'crud-table/:name', component: CrudTableComponent },
  { path: 'emploi-du-temps', component: EmploiDuTempsComponent },
  { path: 'schedule-form', component: ScheduleFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
