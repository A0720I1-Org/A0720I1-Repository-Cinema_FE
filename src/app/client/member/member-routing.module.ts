import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManagerTicketComponent } from './manager-ticket/manager-ticket.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

const routes: Routes = [
{path : "",component : UpdateInfoComponent},
{path : "password",component : ChangePasswordComponent},
{path : "ticket",component : ManagerTicketComponent},
{path : "info",component : UpdateInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
