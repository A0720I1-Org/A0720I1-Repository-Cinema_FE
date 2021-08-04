import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipsRoutingModule } from './memberships-routing.module';
import { ListMembershipComponent } from './list-membership/list-membership.component';
import { UpdateMembershipComponent } from './update-membership/update-membership.component';



@NgModule({
  declarations: [ListMembershipComponent, UpdateMembershipComponent],
  imports: [
    CommonModule,
    MembershipsRoutingModule
  ]
})
export class MembershipsModule { }
