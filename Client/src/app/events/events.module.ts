import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
  schemas: [
    NO_ERRORS_SCHEMA
  ],
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