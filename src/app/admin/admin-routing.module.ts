import { MemberTicketComponent } from './member-ticket/member-ticket.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";


const routes: Routes = [
  {path: '', component: AdminComponent,children : [
    {
      path: 'film', loadChildren: () => import('./film/film.module').then(m => m.FilmModule)
    },
  {
    path : 'member-ticket',component: MemberTicketComponent
  }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
