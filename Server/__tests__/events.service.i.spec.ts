import { Test, TestingModule } from '@nestjs/testing';
import { EventEntityService } from '../src/modules/shared/services/events.service';
import { testProviders, getConn, closeConn, EventEntityServiceFactoryProvider } from '../helpers/providers';
import { TestProvidersModule } from '../helpers/test.provider.module';

describe('EventsService', () => {

  let module: TestingModule;
  let eventSvc: EventEntityService;

  beforeAll(async () => {
    await getConn();
  });
  afterAll(async () => {
    await closeConn();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestProvidersModule
      ]
      // components: [
      //   ...testProviders
      // ]
    })
    .compile();
    eventSvc = module.select(TestProvidersModule).get<EventEntityService>(EventEntityService)
  });

  it('should exist', () => {
    expect(eventSvc).toBeTruthy();
  });

  // it('should have getAll method', async () => {
  //   let events = await eventSvc.all();

  //   console.log(typeof events)

  //   expect(await eventSvc.all).toBeDefined();
  // });
});