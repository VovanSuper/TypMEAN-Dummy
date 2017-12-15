import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../../shared/interfaces/';
import { AuthService, ErrorService } from '../../../shared/module/services/';

@Component({
  selector: 'app-user-auth',
  templateUrl: 'user-auth.component.html',
  styleUrls: ['user-auth.component.scss']
})

export class UserAuthComponent implements OnInit {
  currentUser: IUser = null;
  isLoggedIn = false;

  constructor(
    private authSvc: AuthService,
    private errorSvc: ErrorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      if (val) {
        this.isLoggedIn = true;
        this.currentUser = this.authSvc.currentUser;
      } else {
        // this.errorSvc.error('Authentication faild', 'User-Auth Cmp', '/auth/signin');
        this.isLoggedIn = false;
        this.currentUser = null;
      }
    })
  }

  // ngOnDestroy() {
  //   this.authSvc.isLoggedChange$.unsubscribe();
  // }

  goToLogIn() {
    this.router.navigateByUrl('/auth/signin');
  }

  logOut() {
    this.authSvc.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigateByUrl('/auth/signin');
  }
}