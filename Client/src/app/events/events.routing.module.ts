import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventRouteValidService, EventsResolverService, AuthGuard } from '../shared/module/services/';

import {
  EventDetailsComponent,
  EventsComponent,
  EventCreateComponent
} from './components/';

export const EVENTS_ROUTES: Routes = [
  {
    path: 'events', children: [
      { path: '', component: EventsComponent, resolve: { events: EventsResolverService }, pathMatch: 'full' },
      { path: 'new', component: EventCreateComponent, canActivate: [AuthGuard] },
      {
        path: ':id/details',
        component: EventDetailsComponent,
        canActivate: [EventRouteValidService, AuthGuard]
        // , canDeactivate: ['canLeave']
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EVENTS_ROUTES)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }