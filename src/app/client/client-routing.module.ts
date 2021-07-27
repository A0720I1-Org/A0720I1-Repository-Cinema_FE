import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path : '',component : ClientComponent},
  { path: 'member',component : ClientComponent ,children :[
    {path : 'login' ,component : LoginComponent},
    {path : 'register' ,component : RegisterComponent},
    {path : 'forgot' ,component : ForgotPasswordComponent},
    {path : '' ,loadChildren: () => import('./member/member.module').then(m => m.MemberModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
