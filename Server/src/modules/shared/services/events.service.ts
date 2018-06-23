import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MongoRepository, getMongoRepository } from 'typeorm';

import { EventDto, EventBaseDto, UserDto } from '../../../models/';
import { EventEntity, UserEntity } from '../../../../data/entities/';
import { handleError, svcCtorLogger } from '../../../../helpers/handlers';
import { IEvent } from '../../../../../Client/src/app/shared/interfaces/';
import { providerTokens } from '../../../../helpers/tokens';

@Injectable()
export class EventEntityService implements OnModuleInit {
  // eventsRepo: MongoRepository<EventEntity>;
  // usersRepo: MongoRepository<UserEntity>;
  constructor(
    @Inject(providerTokens.EventEntityRepositoryToken)
    private readonly eventsRepo: MongoRepository<EventEntity>,
    @Inject(providerTokens.UserEntityRepositoryToken)
    private readonly usersRepo: MongoRepository<UserEntity>,
  ) {
    svcCtorLogger(EventEntityService);
    // this.usersRepo = getMongoRepository(UserEntity);
    // this.eventsRepo = getMongoRepository(EventEntity);
  }
  onModuleInit() {}

  async all() /*: Promise<EventDto[] | void>*/ {
    try {
      let events = await this.eventsRepo.find();
      if (!events || events === undefined || events.length === 0) return [];
      // throw new Error('No events found');
      console.log(`Events returned from db: ${JSON.stringify(events)}`);
      // return events.map(event => EventDto.fromEntity(event));
      return events;
    } catch (e) {
      handleError(e);
    }
  }

  async oneById(id: string): Promise<EventDto | void> {
    try {
      let event = await this.eventsRepo.findOne(id);
      if (!event) throw new Error(`No event with id ${id} found`);

      return EventDto.fromEntity(event);
    } catch (e) {
      handleError(e);
    }
  }

  async create(
    event: EventBaseDto,
    creatorID: string,
  ): Promise<EventDto | void> {
    try {
      let creator = await this.usersRepo.findOne(creatorID);
      if (!creator || creator === undefined)
        throw new Error(
          `No User with id of ${creatorID} found. (Not authenticated?) `,
        );

      let newEvent = Object.assign(event, {
        createdBy: UserDto.fromEntity(creator),
      });
      // let eventToSave = event.toPartial<CoreObj>()
      let created = await this.eventsRepo.create(newEvent);
      if (!created) throw new Error('Failed to create new event');

      //TODO: update `paricipating` array in `User` entity (as new event was added)
      // this.usersSvc.oneByFbIdAddEvent()
      creator.participating.push(created.id.toString());
      let updCreator = await this.usersRepo.save(creator);
      console.log(
        `[EventsSvc.create]:: updated creator: ${JSON.stringify(updCreator)}`,
      );

      return EventDto.fromEntity(created);
    } catch (e) {
      handleError(e);
    }
  }

  // to call upon cascade deletion of user from database (there cannot be the deleted participant in Event)
  async manyRemoveSingleParticipantHelper(
    participant: UserEntity,
  ): Promise<EventDto[] | void> {
    try {
      let eventsToUpdate = await this.eventsRepo.find({
        participants: [participant.id],
      });

      // .filter(ev => ev.participants.indexOf(participant) > -1);
      let updatedEvents = eventsToUpdate.map(ev => {
        let participantsOfEvent = ev.participants;
        if (participantsOfEvent.length > 0) {
          let restParticipants = participantsOfEvent.splice(
            participantsOfEvent.indexOf(participant.id),
            1,
          );
          ev.participants = restParticipants;
        }
        return ev;
      });

      return await this.eventsRepo.save(EventDto.fromEntity(updatedEvents));
    } catch (e) {
      return handleError(e);
    }
  }

  // to call upon adding new participants to some Event
  async oneByIdAddSingleParticipantHelper(
    id: string,
    participant: UserEntity,
  ): Promise<EventDto | void> {
    try {
      let eventToUpdate = await this.eventsRepo.findOne(id);
      eventToUpdate.participants.push(participant.id);
      let savedEvnt = await this.eventsRepo.save(eventToUpdate);
      return EventDto.fromEntity(savedEvnt);
    } catch (e) {
      return handleError(e);
    }
  }
}
