import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../src/modules/shared/shared.module';
import {
  EventEntityService,
  UserEntityService,
} from '../src/modules/shared/services/';
import {
  ConnectionProvider,
  UserEntityRepositoryProvider,
  EventEntityRepositoryProvider,
  testProviders,
} from '../helpers/providers';
import {
  userIUser,
  eventIEvent,
  TestProvidersModule,
  ConnHandler,
} from '../helpers/';
import { EventBaseDto, EventDto, UserDto } from '../src/models';
import { removeTestValues, makeTestValues } from '../helpers/tests.stubs';

describe('EventService', () => {
  jest.setTimeout(15000);

  let eventsSvc: EventEntityService;
  let usersSvc: UserEntityService;
  let testUser: UserDto;
  let testEvents: EventDto[];

  afterAll(async () => {
    await removeTestValues();
    await ConnHandler.closeConn('default');
  });

  beforeAll(async () => {
    let conn = await ConnHandler.getConn('default');
    [testUser, ...testEvents] = await makeTestValues(conn);
    // await removeTestValues();

    let testModule: TestingModule = await Test.createTestingModule({
      imports: [TestProvidersModule],
      // ,providers: [
      //   EventEntityService,
      //   UserEntityService
      // ]
    }).compile();
    eventsSvc = testModule.get<EventEntityService>(EventEntityService);
    usersSvc = testModule.get<UserEntityService>(UserEntityService);
  });

  describe('EventSvc', () => {
    it.only('eventSvc should exist', async () => {
      expect(eventsSvc).toBeTruthy();
    });
  });

  // describe('get:all', async () => {
  //   it('should return all Event records from DB', async () => {
  //     let allEvents = await eventsSvc.all();
  //     if (allEvents) {
  //       // expect(allEvents).not.toBeNil();
  //       expect(allEvents).not.toBeNull();
  //       expect(allEvents).toBeTruthy();
  //       expect(allEvents.length).toBeGreaterThan(0);
  //       console.log('All Events are:  ')
  //       console.dir(allEvents)
  //     } else
  //       throw new Error('[get:all --> allEvents : no Events returned from Db')
  //   });
  // });

  describe('get:byId', () => {
    it('should return the exact Event obj by id', async () => {
      console.log('TESTEVETN::::');
      console.dir(testEvents);
      let id = testEvents[0].id;
      let theEvent = await eventsSvc.oneById(id);

      if (theEvent) {
        expect(theEvent.id).toEqual(testEvents[0].id);
        expect(theEvent.name).toEqual(testEvents[0].name);
        expect(theEvent.description).toEqual(testEvents[0]['description']);
      }
    });
  });

  // describe('create new ', () => {
  //   it('should be able to create new Event and return a EventDto', async () => {
  //     let eventDto = EventBaseDto.fromInterface(eventIEvent);
  //     let newEv = await eventsSvc.create(eventDto, testUser.id);
  //     if (newEv) {
  //       expect(newEv).toBeTruthy();
  //       expect(newEv.name).toEqual(eventDto.name);
  //       expect(newEv.createdBy.username).toEqual(testUser.username);
  //       expect(newEv.createdBy.interests).toBeInstanceOf(Array);
  //       console.dir(newEv);
  //     }
  //   });

  // it('should have `participating` field in `testUser` collection correspongin to `participants` in Event', async () => {
  //   let id = testEvents[0].id;
  //   let theEvent = await eventsSvc.oneById(id);
  //   console.dir(theEvent);
  //   if (theEvent) {
  //     let participantId = theEvent.participants[0].id;
  //     console.log(participantId);
  //     let participant = await usersSvc.oneById(participantId);
  //     if (participant) {
  //       expect(participant).toBeTruthy();
  //       expect(participant).not.toBeUndefined();
  //     }
  //     else
  //       throw new Error(`Expected Obj participant::: ${JSON.stringify(participant)}`)
  //   }
  // });

  // });
});
