import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbQueriesService, AuthService, ErrorService } from '../shared/module/services/';
import { IUser } from '../shared/interfaces/';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private fbSvc: FbQueriesService,
    private authSvc: AuthService,
    private errorSvc: ErrorService,
    private router: Router
  ) { }

  loginFb() {
    this.fbSvc.login();
  }

  currentUser: IUser = null;
  isLoggedIn = false;


  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      if (val) {
        this.isLoggedIn = true;
        this.currentUser = this.authSvc.currentUser;
      }
    })
  }

  // ngOnDestroy() {
    // this.authSvc.isLoggedChange$.unsubscribe();
  // }

  fbGetProfile() {
    this.fbSvc.getProfile();
  }

  logIn() {
    this.router.navigateByUrl('/auth/signin');
  }

}
