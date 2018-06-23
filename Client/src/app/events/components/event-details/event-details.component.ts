import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IEvent, IUser } from '../../../shared/interfaces/';
import { ApiService, SnackBarService } from '../../../shared/module/services/';
import { UIParams, UIResponse, FacebookService } from 'ngx-facebook';

@Component({
  templateUrl: 'event-details.component.html',
  styleUrls: [
    'event-details.component.scss',
    'event-datails.component.theme.scss',
  ],
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  likeUrl = 'fb.com/ovsyukov';

  event: IEvent;
  eventCreatorName: string = null;
  isDirty = true; // TODO: verification logic to be settled in here (for editing mode, maybe)
  actRouteSubscription: Subscription = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private api: ApiService,
    private fbSvc: FacebookService,
    private snackSvc: SnackBarService,
  ) {}

  ngOnInit() {
    this.actRouteSubscription = this.actRoute.params.subscribe(param => {
      this.api
        .getEventById(param['id'])
        .then(evnt => (this.event = evnt))
        .then(evnt => (this.eventCreatorName = evnt.createdBy))
        // .then(ev => this.api.getUserById(ev.createdBy))
        // .then(usr => this.eventCreator = usr)
        .catch(err => {
          this.snackSvc.show('Error getting event', JSON.stringify(err));
          console.log(`Error getting event, ${JSON.stringify(err)}`);
        });
    });
  }

  share() {
    const options: UIParams = {
      method: 'share',
      href: this.router.url,
    };

    this.fbSvc
      .ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })
      .catch(err => {
        this.snackSvc.show('Error sharing event', JSON.stringify(err));
        console.log(`Error getting event, ${JSON.stringify(err)}`);
      });
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.actRouteSubscription.unsubscribe();
  }
}
