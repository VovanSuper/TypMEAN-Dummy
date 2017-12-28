import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FbQueriesService, AuthService, ErrorService } from '../shared/module/services/';
import { IUser } from '../shared/interfaces/';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  followPage = 'fb.com/ovsyukov'
  currentUser: IUser = null;
  isLoggedIn = false;

  constructor(
    private fbSvc: FbQueriesService,
    private authSvc: AuthService,
    private errorSvc: ErrorService,
    private router: Router
  ) { }

  loginFb() {
    this.authSvc.loginFb().then(user => {
      console.log(`[home.cmp->loginFb()]:: authenticated; user is: ${JSON.stringify(user)}`);
    })
      .catch(console.log);
  }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      this.isLoggedIn = !!val;
      if (val) {
        this.currentUser = this.authSvc.currentUser;
      } else {
        this.currentUser = null;
      }
    })
  }

  createNewEvent() {
    this.router.navigateByUrl('/events/new');
  }

  search() {
    this.router.navigateByUrl('/events');
  }

  // ngOnDestroy() {
  // this.authSvc.isLoggedChange$.unsubscribe();
  // }

  // fbGetProfile() {
  //   this.fbSvc.getProfile();
  // }

  logIn() {
    this.router.navigateByUrl('/auth/signin');
  }

}
