import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiService } from '../shared/module/services/';
import { IUser, IEvent } from '../shared/interfaces/';
import { SideMenuComponent } from '../shared/reusables/components/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menuOpened = false;
  isAppDarkTheme = false;
  title = 'My partner in sports';

  @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent
  users: IUser[];
  events: IEvent[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    let p1 = this.api.getUsers();
    let p2 = this.api.getEvents();

    Promise.all([p1, p2]).then(([users, events]) => {
      this.users = users || [];
      this.events = events || [];
    })
      .catch(console.error);

    this.sideMenu.sideNav.openedChange.subscribe(val => this.menuOpened = !!val)
  }

}