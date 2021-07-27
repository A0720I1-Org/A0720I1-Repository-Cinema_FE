import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { ListFilmComponent } from './list-film/list-film.component';



@NgModule({
  imports: [
    CommonModule,
    FilmRoutingModule
  ],
  declarations: [ListFilmComponent]
})
export class FilmModule { }
