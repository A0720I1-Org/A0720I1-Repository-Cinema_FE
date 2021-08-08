import { NotFoundPageComponent } from './client/not-found-page/not-found-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {path: '', loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
  {path: 'admin'
  , loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService],
  data: {
    roles: ['ROLE_ADMIN'] //Quy dinh role nao duoc truy cap vao component nay
    },
  },
  {path:'**',component:NotFoundPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
