import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'film', loadChildren: () => import('./film/film.module').then(m => m.FilmModule)},
  {path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)},
  {path: 'ticket', loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
