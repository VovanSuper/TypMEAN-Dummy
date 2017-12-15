import { Component, Input } from '@angular/core';
import { IUser } from '../../../shared/interfaces/';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css']
})

export class UserComponent {
  @Input() user: IUser;
}
