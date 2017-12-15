import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSidenav } from '@angular/material';
import { IUser, IEvent } from '../../../interfaces/';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @ViewChild('sideNav') public sideNav: MatSidenav;
  @Input() isMenuOpened = false;
  @Input() users: IUser[] = [];
  @Input() events: IEvent[] = [];

  constructor() { }

}
