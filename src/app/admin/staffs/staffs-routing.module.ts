import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffUpdateComponent } from './staff-update/staff-update.component';




const routes: Routes = [
  {
    path: '', component: StaffListComponent
  },
  {
    path: 'staff-create', component: StaffCreateComponent
  },
  {
    path: 'staff-update/:id', component: StaffUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
