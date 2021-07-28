import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomepagesComponent } from './homepages/homepages.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';


@NgModule({
  declarations: [
    HomepagesComponent,
    FilmDetailComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
