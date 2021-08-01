
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { ManagerTicketComponent } from './manager-ticket/manager-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [MemberComponent, ChangePasswordComponent, SidebarComponent, UpdateInfoComponent, ManagerTicketComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class MemberModule { }
