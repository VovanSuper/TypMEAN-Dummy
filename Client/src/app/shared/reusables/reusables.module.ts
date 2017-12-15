import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CarouselComponent, SideMenuComponent } from './components/';
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
    SideMenuComponent
  ],
  declarations: [
    CarouselComponent,
    SideMenuComponent
  ],
  entryComponents: [CarouselComponent]
})
export class ReusablesModule { }
