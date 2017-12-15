import { Component, Inject } from '@nestjs/common';
// import { EventRepository } from '../../../../data/repositories/';
// import { Container, Service } from 'typedi';
import { MongoRepository, getMongoRepository } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Event } from '../../../data/entities';

@Component()
export class EventsService {
  public repo: MongoRepository<Event>;
  // constructor( @OrmRepository(Event) public repo: MongoRepository<Event>) {
  // constructor() {
  // super();

  constructor() {
    this.repo  = getMongoRepository(Event);
    console.log('EventsService ctor..... ');
  }
}
