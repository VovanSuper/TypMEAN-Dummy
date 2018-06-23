import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEvent, IUser } from '../../../shared/interfaces/';
import { ApiService } from '../../../shared/module/services/';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: IUser;
  isDirty = true; // TODO: verification logic to be settled in here
  actRouteSubscription: Subscription = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private api: ApiService,
  ) {}

  goBack() {
    this.router.navigateByUrl('/users');
  }

  ngOnInit() {
    this.actRouteSubscription = this.actRoute.params.subscribe(param => {
      this.api.getUserById(param['id']).then(resp => (this.user = resp));
    });
  }

  ngOnDestroy() {
    this.actRouteSubscription.unsubscribe();
  }
}
