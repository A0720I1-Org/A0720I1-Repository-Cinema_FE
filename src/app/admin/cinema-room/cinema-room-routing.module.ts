import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCinemaRoomComponent} from "./list-cinema-room/list-cinema-room.component";
import {DetailCinemaRoomComponent} from "./detail-cinema-room/detail-cinema-room.component";


const routes: Routes = [
  {
    path: '', component: ListCinemaRoomComponent
  },
  {
    path: 'detail/:id', component: DetailCinemaRoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoomRoutingModule { }
