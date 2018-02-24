import { Component, Inject, forwardRef } from '@nestjs/common';
import { MongoRepository, getMongoRepository, ObjectLiteral } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UsersService } from './users.service';
import { EventDto } from '../../../models/';
import { Event, User } from '../../../../data/entities/';

@Component()
export class EventsService {
  private eventsRepo: MongoRepository<Event>;
  // private usersRepo: MongoRepository<User>;
  // constructor( @OrmRepository(Event) public repo: MongoRepository<Event>) {
  // constructor() {
  // super();

  constructor(@Inject(forwardRef(() => UsersService)) private readonly usersSvc: UsersService) {
    this.eventsRepo = getMongoRepository(Event);
    // this.usersRepo = getMongoRepository(User);
    console.log('EventsService ctor..... ');
  }

  async all(): Promise<Event[]> {
    try {
      let events = await this.eventsRepo.find();
      if (!events || events === undefined || events.length === 0)
        throw new Error('No events found');

      return events;
    } catch (e) {
      this.handleError(e);
    }
  }

  async oneById(id: string | number): Promise<Event | void> {
    try {
      let event = await this.eventsRepo.findOneById(id);
      if (!event)
        throw new Error(`No event with id ${id} found`);

      return event;
    } catch (e) {
      this.handleError(e);
    }
  }

  async create(event: EventDto, creatorID: string | number): Promise<Event | void> {
    try {
      let creator = await this.usersSvc.oneById(creatorID);
      if (!creator || creator === undefined)
        throw new Error(`No User with id of ${creatorID} found / Not authenticated`);

      //TODO: verify Date parsing (from express it comes as number already, not string!)
      let newEvent: Partial<Event> = {
        createdAt: new Date(Date.parse(event.createdAt)) || new Date(Date.now()),
        startDate: new Date(Date.parse(event.startDate)) || new Date(Date.now()),
        endDate: new Date(Date.parse(event.endDate)) || new Date(Date.now()),
        name: event.name,
        description: event.description,
        place: event.place,
        createdBy: creator,
        participants: []
      }

      let created = await this.eventsRepo.save(newEvent);
      if (!created)
        throw new Error('Failed to create new event');

      //TODO: update `paricipating` array in `User` entity (as new event was added)
      // this.usersSvc.oneByFbIdAddEvent()
      return created as Event;
    } catch (e) {
      this.handleError(e);
    }
  }

  // to call upon cascade deletion of user from database (there cannot be the deleted participant in Event)
  async manyRemoveSingleParticipant(participant: User): Promise<Event[] | void> {
    try {
      let eventsToUpdate = (await this.eventsRepo.find({
        where: function() {
          this.participants.indexOf(participant) > -1
        }
      }));

        // .filter(ev => ev.participants.indexOf(participant) > -1);
      let updatedEvents = eventsToUpdate.map(ev => {
        let participantsOfEvent = ev.participants;
        if (participantsOfEvent.length > 0) {
          let restParticipants = participantsOfEvent.splice(participantsOfEvent.indexOf(participant), 1);
          ev.participants = restParticipants;
        }
        return ev;
      });
      return await this.eventsRepo.save(updatedEvents);
    } catch (e) {
      return this.handleError(e);
    }
  }

  // to call upon adding new participants to the Event
  async oneByIdAddSingleParticipant(id: string | number, participant: User): Promise<Event | void> {
    try {
      let eventToUpdate = await this.eventsRepo.findOneById(id);
      eventToUpdate.participants.push(participant);
      return await this.eventsRepo.save(eventToUpdate);
    } catch (e) {
      return this.handleError(e);
    }
  }

  private handleError(e: Error | string) {
    console.log('Error executing query');
    if (e instanceof Error) {
      console.error(`${e.name} -- ${e.message}`);
      console.error(`${e.stack}`);
    } else {
      console.error(e);
    }
    return Promise.reject(e);
  }
}
