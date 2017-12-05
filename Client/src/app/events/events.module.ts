import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent, EventDetailsComponent, EventsComponent } from './components/';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventDetailsComponent
  ]
})
export class EventsModule { }
