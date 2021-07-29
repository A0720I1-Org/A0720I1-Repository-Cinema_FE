import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketBookingRoutingModule } from './ticket-booking-routing.module';
import { FilmSelectionComponent } from './film-selection/film-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import {ToastrModule} from "ngx-toastr";
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingInformationComponent } from './booking-information/booking-information.component';


@NgModule({
  declarations: [FilmSelectionComponent, SeatSelectionComponent, BookingConfirmationComponent, BookingInformationComponent],
  imports: [
    CommonModule,
    TicketBookingRoutingModule,
    ToastrModule.forRoot()
  ]
})
export class TicketBookingModule { }
