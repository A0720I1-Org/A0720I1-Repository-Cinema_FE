import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./admin-shared/admin-shared.module";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    AdminSharedModule,
    ToastrModule.forRoot()
  ]
})
export class AdminModule {
}
