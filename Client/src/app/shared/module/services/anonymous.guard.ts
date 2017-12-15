import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorService } from './error.service';

@Injectable()
export class AnonymousGuard implements CanActivate {

  constructor(private userSvc: AuthService, private errorSvc: ErrorService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.userSvc.isAuthenticated())
      this.errorSvc.error('Already authenticated', 'Auth', '/auth/profile');

    return !this.userSvc.isAuthenticated();
  }
}
