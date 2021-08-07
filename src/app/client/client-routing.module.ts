
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';


const routes: Routes = [
  {path : '',component : ClientComponent},

  { path: 'member',component : ClientComponent ,
  children :[
    {path : 'forgot',component : ForgotPasswordComponent},
    {path : 'login' ,
    component : LoginComponent,
  },
    {path : 'register' ,component : RegisterComponent},
    {path : 'ticket' ,component : NotFoundPageComponent},
    {path : 'manager' ,
    loadChildren: () => import('./member/member.module').then(m => m.MemberModule),
    canActivate : [AuthGuardService],
    data: {
      roles: ['ROLE_MEMBER','ROLE_ADMIN'] //Quy dinh role nao duoc truy cap vao component nay
      },
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
