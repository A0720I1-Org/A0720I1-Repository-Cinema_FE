import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowtimeRoutingModule } from './showtime-routing.module';
import { DetailShowtimeComponent } from './detail-showtime/detail-showtime.component';
import {HttpClientModule} from "@angular/common/http";
import { CreateShowtimeComponent } from './create-showtime/create-showtime.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [DetailShowtimeComponent, CreateShowtimeComponent],
    imports: [
        CommonModule,
        ShowtimeRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class ShowtimeModule { }
