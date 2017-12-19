import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSidenav } from '@angular/material';
import { IUser, IEvent } from '../../../interfaces/';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  isLight = false;
  @Output('is-light') isLightTheme: EventEmitter<boolean> = new EventEmitter();

  changeTheme() {
    this.isLight = !this.isLight;
    this.isLightTheme.emit(this.isLight)
  }

}
