import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent, UserDetailsComponent, UsersComponent } from './components/';
import { UsersRoutingModule } from './users.routing.module';
import { CommonDeptsModule } from '../shared/';

@NgModule({
  imports: [
    CommonModule,
    CommonDeptsModule,
    UsersRoutingModule
  ],
  declarations: [
    UserComponent,
    UserDetailsComponent,
    UsersComponent
  ]
})
export class UsersModule { }