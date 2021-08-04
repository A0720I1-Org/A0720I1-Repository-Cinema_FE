import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'film', loadChildren: () => import('./film/film.module').then(m => m.FilmModule)},
      {path: 'cinema-room', loadChildren: () => import('./cinema-room/cinema-room.module').then(m => m.CinemaRoomModule)},
      {path: 'showtime', loadChildren: () => import('./showtime/showtime.module').then(m => m.ShowtimeModule)},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
