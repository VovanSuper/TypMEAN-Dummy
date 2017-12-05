import { Component, OnInit } from '@angular/core';

import { ApiService } from './shared/services/';
import { IUser, IEvent } from './shared/models/';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  menuOpened = false;
  title = 'My partner in sports';
  selected: IUser = null;
  friends: Observable<IUser[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.friends = this.api.getUsers();
  }

}