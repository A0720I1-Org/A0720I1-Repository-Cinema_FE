import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListFilmComponent} from "./list-film/list-film.component";
import {CreateFilmComponent} from "./create-film/create-film.component";
import {UpdateFilmComponent} from "./update-film/update-film.component";
import {DetailFilmComponent} from "./detail-film/detail-film.component";


const routes: Routes = [
  {path: "list", component: ListFilmComponent},
  {path: "create", component: CreateFilmComponent},
  {path: "update/:id", component: UpdateFilmComponent},
  {path: "find/:id", component: DetailFilmComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule {
}
