import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FilmRoutingModule} from './film-routing.module';
import {ListFilmComponent} from './list-film/list-film.component';
import {CreateFilmComponent} from './create-film/create-film.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { UpdateFilmComponent } from './update-film/update-film.component';
import { DetailFilmComponent } from './detail-film/detail-film.component';



@NgModule({
  imports: [
    CommonModule,
    FilmRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  declarations: [ListFilmComponent, CreateFilmComponent, UpdateFilmComponent, DetailFilmComponent]
})
export class FilmModule {
}
