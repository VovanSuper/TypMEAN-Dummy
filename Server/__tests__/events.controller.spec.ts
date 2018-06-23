import { Test } from '@nestjs/testing';

import {
  EventEntityService,
  UserEntityService,
} from '../src/modules/shared/services/';
import { EventDto, EventBaseDto } from '../src/models/dto/';
import { EventsController } from '../src/modules/events/controllers/events.controller';
import { events } from '../helpers/entitiesDto.mock';

describe('EventsController', () => {
  let eventsCtrl: EventsController;
  let singleEvent: EventBaseDto = events[0];

  class EventsSvcMock {
    all() {
      return [...events];
    }
    oneById(id: string) {
      let event = events.find(ev => ev.id == id);
      if (event) return event;
      else throw new Error(`No event with id ${id} found`);
    }
  }

  let eventsSvc: EventEntityService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventEntityService],
    })
      .overrideComponent(EventEntityService)
      .useClass(EventsSvcMock)
      .compile();

    eventsSvc = module.get<EventEntityService>(EventEntityService);
    eventsCtrl = module.get<EventsController>(EventsController);
  });

  describe('findAll', () => {
    it('should return an array of EventDto objects', async () => {
      // jest.spyOn(eventsSvc, 'all').mockImplementation(() => [event]);
      let ctrlAllEvents = await eventsCtrl.getAll();
      expect(ctrlAllEvents).toBeTruthy();
      expect(ctrlAllEvents.operationStatus).toEqual('Found');
      expect(ctrlAllEvents.data).toContain(singleEvent);
    });
  });
});
