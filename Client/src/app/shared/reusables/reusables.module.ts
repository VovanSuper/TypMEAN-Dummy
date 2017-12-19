import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CarouselComponent, SideMenuComponent, UserMenuComponent } from './components/';
import { NgxSiemaModule } from 'ngx-siema';
import { CommonDeptsModule } from '../index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CommonDeptsModule,
    NgxSiemaModule
  ],
  exports: [
    CarouselComponent,
    SideMenuComponent,
    UserMenuComponent
  ],
  declarations: [
    CarouselComponent,
    SideMenuComponent,
    UserMenuComponent
  ],
  entryComponents: [CarouselComponent]
})
export class ReusablesModule { }
