import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private errorSvc: ErrorService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authSvc.isAuthenticated)
      this.errorSvc.error('Not authenticated', 'Auth', '/auth/signin')

    return this.authSvc.isAuthenticated;
  }
}