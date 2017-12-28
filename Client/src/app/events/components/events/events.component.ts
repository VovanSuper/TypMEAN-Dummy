import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../../shared/interfaces/';

@Component({
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: IEvent[];

  constructor(private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.actRoute.data.subscribe(data => {
      this.events = data['events'];
    })
  }

  gotoCreate() {
    this.router.navigateByUrl('/events/new');
  }
}
