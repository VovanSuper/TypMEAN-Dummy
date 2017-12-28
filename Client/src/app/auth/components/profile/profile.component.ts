import { Component, OnInit } from '@angular/core';
import { AuthService, ErrorService } from '../../../shared/module/services/';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authSvc: AuthService, private errorSvc: ErrorService) { }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(isLogged => {
      if(!isLogged)
        this.errorSvc.error('Logged out the user', 'Logged out', '/home');
    })
  }

}
