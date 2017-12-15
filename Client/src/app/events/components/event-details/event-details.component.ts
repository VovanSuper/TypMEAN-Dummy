import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { IEvent, IUser } from '../../../shared/interfaces/';
import { ApiService } from '../../../shared/module/services/';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'event-details.component.html',
  styleUrls: ['event-details.component.scss', 'event-datails.component.theme.scss']
})

export class EventDetailsComponent implements OnInit, OnDestroy {
  event: IEvent;
  eventCreator: IUser = null;
  isDirty = true;                   // TODO: verification logic to be settled in here (for editing mode, maybe)
  actRouteSubscription: Subscription = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private api: ApiService
    // , @Inject(TOASTR_TOKEN) private toastr: IToastr
  ) { }

  goBack() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.actRouteSubscription = this.actRoute.params.subscribe(param => {
      this.api.getEventById(param['id'])
        .then(evnt => this.event = evnt)
        .then(resp => this.api.getUserById(resp.createdBy))
        .then(usr => this.eventCreator = usr)
        .catch(err => {
          console.error(err);
          // this.toastr.error(err, 'Error querying for Creator of the Event')
        });
    });
  }

  ngOnDestroy() {
    this.actRouteSubscription.unsubscribe();
  }

}
