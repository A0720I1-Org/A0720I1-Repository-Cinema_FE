import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaRoomRoutingModule } from './cinema-room-routing.module';
import { ListCinemaRoomComponent } from './list-cinema-room/list-cinema-room.component';
import { DetailCinemaRoomComponent } from './detail-cinema-room/detail-cinema-room.component';


@NgModule({
  declarations: [ListCinemaRoomComponent, DetailCinemaRoomComponent],
  imports: [
    CommonModule,
    CinemaRoomRoutingModule
  ]
})
export class CinemaRoomModule { }
