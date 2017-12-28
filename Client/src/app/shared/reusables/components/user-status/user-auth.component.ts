import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../../interfaces/';
import { AuthService } from '../../../module/services/';

@Component({
  selector: 'app-user-auth',
  templateUrl: 'user-auth.component.html',
  styleUrls: ['user-auth.component.scss']
})

export class UserStatusComponent implements OnInit {
  currentUser: IUser = null;
  isLoggedIn = false;

  constructor(
    private authSvc: AuthService,
    // private errorSvc: ErrorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      this.isLoggedIn = !!val;
      if (val) {
        this.currentUser = this.authSvc.currentUser;
      } else {
        // this.errorSvc.error('Authentication faild', 'User-Auth Cmp', '/auth/signin');
        this.currentUser = null;
      }
    })
  }

  logInFb() {
    // this.router.navigateByUrl('/auth/signin');
    this.authSvc.loginFb().then(user => {
      if (user && user !== undefined) {
        console.log(`user-auth.cmp->logInFb():: returned user is: ${JSON.stringify(user)}`);
        console.dir(user);
        // this.currentUser = user;
      } else {
        throw new Error('[user-auth.cmp->logInFb()]:: No user returned by loginFb()')
      }
    }).catch(console.error);
  }

  logOut() {
    this.authSvc.logout();
    // this.isLoggedIn = false;
    // this.currentUser = null;
    this.router.navigateByUrl('/auth/signin');
  }
}