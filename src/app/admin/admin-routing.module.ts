import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'film', loadChildren: () => import('./film/film.module').then(m => m.FilmModule)},
      {path: 'cinema-room', loadChildren: () => import('./cinema-room/cinema-room.module').then(m => m.CinemaRoomModule)},
      {path: 'staffs', loadChildren: () => import('./staffs/staffs.module').then(m => m.StaffsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
