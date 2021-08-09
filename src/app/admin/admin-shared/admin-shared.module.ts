import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminSharedRoutingModule} from './admin-shared-routing.module';
import {AdminSidebarComponent} from './admin-sidebar/admin-sidebar.component';
import {AdminNavbarComponent} from './admin-navbar/admin-navbar.component';
import {AdminFooterComponent} from "./admin-footer/admin-footer.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [AdminSidebarComponent, AdminNavbarComponent, AdminFooterComponent],
  exports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    AdminSharedRoutingModule,
    HttpClientModule
  ]
})
export class AdminSharedModule {
}
