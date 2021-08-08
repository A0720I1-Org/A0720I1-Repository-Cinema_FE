import {MemberModule} from './member/member.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ClientSharedModule} from './client-shared/client-shared.module';
import {ClientComponent} from './client.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomepagesComponent} from './home/homepages/homepages.component';
import {FilmDetailComponent} from './home/film-detail/film-detail.component';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RouterModule} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SafePipe, ViewTrailerComponent} from './home/view-trailer/view-trailer.component';
import { TicketPriceComponent } from './home/ticket-price/ticket-price.component';


@NgModule({
  declarations: [
    ClientComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomepagesComponent,
    FilmDetailComponent,
    ViewTrailerComponent,
    SafePipe,
    TicketPriceComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ClientSharedModule,
    RouterModule,
    MemberModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
  ]
})
export class ClientModule {
}
