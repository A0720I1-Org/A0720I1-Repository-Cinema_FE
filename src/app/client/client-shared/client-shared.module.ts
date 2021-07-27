import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSharedRoutingModule } from './client-shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ClientSharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ClientSharedModule { }
