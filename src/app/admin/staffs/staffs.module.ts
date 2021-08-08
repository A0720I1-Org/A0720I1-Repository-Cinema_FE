import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffUpdateComponent } from './staff-update/staff-update.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [StaffListComponent, StaffCreateComponent, StaffUpdateComponent],
  imports: [
    CommonModule,
    StaffsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ]
})
export class StaffsModule { }
