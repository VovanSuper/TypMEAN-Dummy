import 'reflect-metadata';
import { Container, Token } from 'typedi';
import {
  createConnection,
  useContainer,
  MongoRepository,
  getMongoRepository,
  Connection,
} from 'typeorm';
import { EventEntity } from '../../entities';
import { EventService } from '../event.repository';
import { TestingModuleBuilder, TestingModule, Test } from '@nestjs/testing';
import { IRepository } from '../interfaces/IRepository';
import { ConnHandler } from '../../../helpers';

describe('Typeorm-Event Repository', () => {
  let svc: EventService;
  let nestModule: TestingModule;

  beforeAll(async () => {
    useContainer(Container, { fallback: true, fallbackOnErrors: true });
    let conn = await ConnHandler.getConn('test-conn');

    Container.set('ConnToken', conn);

    let eventRepo = (<Connection>Container.get('ConnToken')).getMongoRepository(
      EventEntity,
    );

    // useContainer(Container);
    const eventSvcToken = new Token<IRepository<EventEntity>>();

    // Container.set({ id: eventSvcToken, factory: () => new EventService(eventRepo), global: true });
    Container.set({
      id: eventSvcToken,
      global: true,
      type: () => new EventService(eventRepo),
    });
    // Container.set()
    // svc = Container.get<EventService>('EventSvc');
    nestModule = await Test.createTestingModule({
      providers: [
        { provide: 'ConnToken', useFactory: () => Container.get('ConnToken') },
        {
          provide: EventService,
          useFactory: () => Container.get(eventSvcToken),
        },
      ],
    }).compile();
    svc = nestModule.get<EventService>(EventService);
  });

  describe('repo should exist', () => {
    it('should exist', async () => {
      expect(svc).toBeTruthy();

      let events = await svc.all();

      console.log(JSON.stringify(events[0]));

      expect(events).toBeTruthy();
    });
  });
});
