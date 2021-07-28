import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSharedRoutingModule } from './client-shared-routing.module';
import { HomepageComponent } from '../homepage/homepage.component';


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    ClientSharedRoutingModule
  ]
})
export class ClientSharedModule { }
