import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent, SigninComponent, ProfileComponent } from './components/';
import { AuthGuard } from '../shared/module/services/';
import { AnonymousGuard } from '../shared/module/services/';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth', children: [
      { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard] },
      { path: 'signin', component: SigninComponent, canActivate: [AnonymousGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }