import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateShowtimeComponent} from "./create-showtime/create-showtime.component";


const routes: Routes = [
  {path: 'create', component: CreateShowtimeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowtimeRoutingModule { }
