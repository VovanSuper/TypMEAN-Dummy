import { Test, TestingModule } from '@nestjs/testing';
import { UserEntityService } from '../src/modules/shared/services/users.service';
import { EventEntityService } from '../src/modules/shared/services/events.service';
import { TestProvidersModule } from '../helpers/test.provider.module';
import { providerTokens } from '../helpers/tokens';
import { SharedModule } from '../src/modules/shared/shared.module';
import {} from '../helpers/providers';
import { removeTestValues, makeTestValues } from '../helpers/tests.stubs';
import { DefaultConnectionProviderModule } from '../helpers/conn.providers.module';
import { ConnHandler } from '../helpers/handlers';

describe('EventsService', () => {
  jest.setTimeout(20000);

  let module: TestingModule;
  let eventSvc: EventEntityService;

  beforeAll(async () => {
    let conn = await ConnHandler.getConn();
    await removeTestValues();
    await makeTestValues(conn);
  });
  afterAll(async () => {
    await ConnHandler.closeConn();
    await removeTestValues();
  });

  // beforeAll(async () => {
  //   module = await Test.createTestingModule({
  //     imports: [
  //       SharedModule
  //     ]
  //   })
  //     .compile();
  //   eventSvc = module.get(EventEntityService);
  // });

  beforeAll(done => {
    Test.createTestingModule({
      imports: [
        DefaultConnectionProviderModule,
        SharedModule,
        // TestProvidersModule
      ],
      // , providers: [
      //   UserEntityService,
      //   EventEntityService
      // ]
    })
      .compile()
      .then(cMod => {
        // eventSvc = cMod.get<EventEntityService>(EventEntityService);
        eventSvc = cMod.get<EventEntityService>(EventEntityService);
        done();
      });
  });

  // it('should do', () => {
  //   expect(true).toBeTruthy();
  // })

  it('shoudl exist', async () => {
    console.log('EventSvc: :::');
    console.log(typeof eventSvc);
    console.log(typeof eventSvc.all);

    let evs = await eventSvc.all();
    console.dir(typeof evs);
    console.dir(evs);
    expect(evs).toBeTruthy();
  });

  // it('should have getAll method', async () => {
  //   Promise.resolve(async (resolve) => {
  //     let events = await eventSvc.all();

  //     console.log(`TypeOf events :: ${typeof events}`)
  //     resolve(events);

  //   }).then(async events => {

  //     expect(await eventSvc.all).toBeDefined();
  //   })
  // })
});
