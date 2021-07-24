import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListFilmComponent} from "./list-film/list-film.component";


const routes: Routes = [
  {path: "list", component: ListFilmComponent},
  {path : "",redirectTo : "/admin/film/list",pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
