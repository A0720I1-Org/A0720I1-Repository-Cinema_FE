import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListMembershipComponent} from "./list-membership/list-membership.component";
import {UpdateMembershipComponent} from "./update-membership/update-membership.component";


const routes: Routes = [
  {
    path: '', component: ListMembershipComponent
  },
  {
    path: 'update', component: UpdateMembershipComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipsRoutingModule { }
