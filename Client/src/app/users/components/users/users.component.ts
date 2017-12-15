import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../shared/interfaces/';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: IUser[];

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.users = this.actRoute.snapshot.data['users'];
  }

}
