import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { IEvent } from '../../interfaces/';

@Injectable()
export class EventsResolverService implements Resolve<Promise<IEvent[]> | IEvent[]> {

  constructor(private api: ApiService) { }

  resolve() {
    return new Promise<IEvent[]>((resolve, reject) => {
      this.api.getEvents()
        .then(events => resolve(events as IEvent[]))
        .catch(err => reject(err));
    });
  }
}
