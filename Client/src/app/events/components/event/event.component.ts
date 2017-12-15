import { Component, Input } from '@angular/core';
import { IEvent } from '../../../shared/interfaces/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss', 'event.component.theme.scss']
})

export class EventComponent {
  @Input() event: IEvent;
}
