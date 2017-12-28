import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService, AuthService, MenuService } from '../shared/module/services/';
import { IUser, IEvent } from '../shared/interfaces/';
import { SideMenuComponent } from '../shared/reusables/components/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isMenuOpened = false;
  isLoggedIn = false;
  isAppDarkTheme = false;
  title = 'My partner in sports';
  
  @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;

  constructor(private api: ApiService, private authSvc: AuthService, private menuSvc: MenuService) { }

  ngOnInit() {
    this.authSvc.isLoggedChange$.subscribe(val => {
      this.isLoggedIn = val;
      if (!!val) {
        console.log('Loged in');
      }
    });
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
    this.menuSvc.sideMenuOpened.next(this.isMenuOpened);
  }

}