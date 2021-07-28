import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepagesComponent} from "./homepages/homepages.component";
import {FilmDetailComponent} from "./film-detail/film-detail.component";


const routes: Routes = [
  {path: '', component: HomepagesComponent},
  {path: 'detail', component: FilmDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
