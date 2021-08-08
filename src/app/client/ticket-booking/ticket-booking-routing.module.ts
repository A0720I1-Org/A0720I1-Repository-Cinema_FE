import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmSelectionComponent} from "./film-selection/film-selection.component";
import {SeatSelectionComponent} from "./seat-selection/seat-selection.component";
import {BookingConfirmationComponent} from "./booking-confirmation/booking-confirmation.component";
import {BookingInformationComponent} from "./booking-information/booking-information.component";
import {CreateBookingComponent} from "./create-booking/create-booking.component";
import {AuthGuardService} from "../../service/auth-guard.service";


const routes: Routes = [
  {path: 'film-selection', component: FilmSelectionComponent},
  {path: 'seat-selection', component: SeatSelectionComponent},
  {path: 'booking-confirmation', component: BookingConfirmationComponent},
  {path: 'create-booking', component: CreateBookingComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['ROLE_MEMBER']
    }},
  {path: 'booking-information/:id', component: BookingInformationComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: ['ROLE_MEMBER']
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketBookingRoutingModule { }
