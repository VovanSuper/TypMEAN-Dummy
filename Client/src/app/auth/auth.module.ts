import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent, SignupComponent } from './components/';
import { CommonDeptsModule } from "../shared/";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    CommonDeptsModule,
    AuthRoutingModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ProfileComponent
  ]
})
export class AuthModule { }