import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketBookingRoutingModule } from './ticket-booking-routing.module';
import { FilmSelectionComponent } from './film-selection/film-selection.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import {ToastrModule} from "ngx-toastr";
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingInformationComponent } from './booking-information/booking-information.component';
import {ClientSharedModule} from "../client-shared/client-shared.module";
import { CreateBookingComponent } from './create-booking/create-booking.component';


@NgModule({
  declarations: [FilmSelectionComponent, SeatSelectionComponent, BookingConfirmationComponent, BookingInformationComponent, CreateBookingComponent],
    imports: [
        CommonModule,
        TicketBookingRoutingModule,
        ToastrModule.forRoot(),
        ClientSharedModule
    ]
})
export class TicketBookingModule { }
