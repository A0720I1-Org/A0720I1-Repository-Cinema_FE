import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberTicketComponent } from './member-ticket/member-ticket.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";


@NgModule({
  declarations: [AdminComponent,MemberTicketComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}
