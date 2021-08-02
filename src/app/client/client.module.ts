import { MemberModule } from './member/member.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ClientSharedModule } from './client-shared/client-shared.module';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [ClientComponent,LoginComponent,RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ClientSharedModule,
    RouterModule,
    MemberModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule
  ]})
export class ClientModule { }
