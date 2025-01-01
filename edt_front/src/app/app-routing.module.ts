import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudTableComponent } from './crud-table/crud-table.component';

const routes: Routes = [
  { path: 'crud-table/:name', component: CrudTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
