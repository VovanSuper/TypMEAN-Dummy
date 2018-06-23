import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { IUser, IEvent } from '../../../interfaces/';
import {
  ApiService,
  AuthService,
  MenuService,
} from '../../../module/services/';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  @ViewChild('sideNav') private sideNav: MatSidenav;
  isLogged = false;
  menuOpenedSubsr: Subscription;
  users: IUser[] = [];
  events: IEvent[] = [];

  constructor(
    private api: ApiService,
    private authSvc: AuthService,
    private menuSvc: MenuService,
  ) {}

  ngOnInit() {
    this.menuOpenedSubsr = this.menuSvc.sideMenuOpened.subscribe(isOpened =>
      this.sideNav.toggle(!!isOpened),
    );
    this.authSvc.isLoggedChange$.subscribe(isLogged => {
      this.isLogged = !!isLogged;
      if (!!isLogged) {
        this.getAllEventsAndUsers();
      }
    });
  }

  ngOnDestroy() {
    this.menuOpenedSubsr.unsubscribe();
  }

  private getAllEventsAndUsers() {
    let p1 = this.api.getUsers();
    let p2 = this.api.getEvents();

    Promise.all([p1, p2])
      .then(([users, events]) => {
        this.users = users || [];
        this.events = events || [];
      })
      .catch(console.error);
  }
}
