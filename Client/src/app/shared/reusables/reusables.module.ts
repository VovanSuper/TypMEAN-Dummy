import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CarouselComponent, SideMenuComponent, UserMenuComponent, UserStatusComponent } from './components/';
import { NgxSiemaModule } from 'ngx-siema';
import { CommonDeptsModule } from '../commons/commons.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonDeptsModule,
    NgxSiemaModule
  ],
  exports: [
    UserStatusComponent,
    CarouselComponent,
    SideMenuComponent,
    UserMenuComponent
  ],
  declarations: [
    UserStatusComponent,
    CarouselComponent,
    SideMenuComponent,
    UserMenuComponent
  ],
  entryComponents: [CarouselComponent]
})
export class ReusablesModule { }
