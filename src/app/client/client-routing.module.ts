import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ClientComponent} from './client.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepagesComponent} from "./home/homepages/homepages.component";
import {FilmDetailComponent} from "./home/film-detail/film-detail.component";
import {TicketPriceComponent} from "./home/ticket-price/ticket-price.component";


const routes: Routes = [

  {path: '', component: HomepagesComponent},
  {
    path: 'member', component: ClientComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot', component: ForgotPasswordComponent},
      {path: '', loadChildren: () => import('./member/member.module').then(m => m.MemberModule)},
      {path: 'detail/:id', component: FilmDetailComponent},
      {path: 'ticket-price', component: TicketPriceComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
