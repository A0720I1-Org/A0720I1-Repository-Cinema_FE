import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientSharedRoutingModule } from './client-shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({

  declarations: [HeaderComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    ClientSharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class ClientSharedModule { }
