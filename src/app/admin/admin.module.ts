import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./admin-shared/admin-shared.module";



@NgModule({
  declarations: [AdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        RouterModule,
        AdminSharedModule
    ]
})
export class AdminModule {
}
