import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDeptsModule } from '../shared/';
import { EventsRoutingModule } from './events.routing.module';
import {
  EventsComponent,
  EventComponent,
  EventDetailsComponent,
  EventCreateComponent
} from './components/';

@NgModule({
  imports: [
    CommonModule,
    CommonDeptsModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    EventCreateComponent
  ]
})
export class EventsModule { }