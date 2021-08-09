import { ChangeIdPipe } from './pipe/invoice-id';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberTicketComponent } from './member-ticket/member-ticket.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminSharedModule} from "./admin-shared/admin-shared.module";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [AdminComponent,MemberTicketComponent,ChangeIdPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AdminSharedModule
  ]
})
export class AdminModule {
}
