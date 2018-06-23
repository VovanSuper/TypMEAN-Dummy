import { resolve } from 'path';
import { get } from 'config';
import {
  getConnection,
  createConnection,
  getConnectionManager,
  getConnectionOptions,
  ConnectionOptions,
  ConnectionOptionsReader,
  getMongoRepository,
  ConnectionManager,
  Connection,
  MongoRepository,
} from 'typeorm';
import { Inject, Module } from '@nestjs/common';
import { UserEntity, EventEntity } from '../data/entities';
import { handleError, ConnHandler } from '../helpers/handlers';
import { EventEntityService } from '../src/modules/shared/services/events.service';
import { UserEntityService } from '../src/modules/shared/services/users.service';
import { providerTokens } from './tokens';

export class EventEntityServiceFactory {
  static instance: EventEntityService;

  static getInstance(
    eventsRepo: MongoRepository<EventEntity>,
    usersRepo: MongoRepository<UserEntity>,
  ) {
    if (!this.instance || this.instance == undefined) {
      // this.instance = new EventEntityService(eventsRepo, usersRepo);
      this.instance = new EventEntityService(eventsRepo, usersRepo);
    }
    return this.instance;
  }
}

export class UserEntityServiceFactory {
  static instance: UserEntityService;

  static getInstance(
    usersRepo: MongoRepository<UserEntity>,
    eventsRepo: MongoRepository<EventEntity>,
  ) {
    if (!this.instance || this.instance == undefined) {
      // this.instance = new UserEntityService(usersRepo, eventsRepo);
      this.instance = new UserEntityService(usersRepo, eventsRepo);
    }
    return this.instance;
  }
}

export const ConnectionProvider = (
  connName: string = providerTokens.defaultConnectionToken,
) => {
  return {
    provide: connName,
    useFactory: async (): Promise<Connection> =>
      await ConnHandler.getConn(connName),
  };
};

export const EventEntityRepositoryProvider = (
  connName: string = <string>providerTokens.defaultConnectionToken,
) => {
  return {
    provide: <string>providerTokens.EventEntityRepositoryToken,
    useFactory: (conn: Connection) => conn.getMongoRepository(EventEntity),
    inject: [connName],
  };
};

export const UserEntityRepositoryProvider = (
  connName: string = <string>providerTokens.defaultConnectionToken,
) => {
  return {
    provide: <string>providerTokens.UserEntityRepositoryToken,
    useFactory: (conn: Connection) => conn.getMongoRepository(UserEntity),
    inject: [connName],
  };
};

export const UserEntityServiceFactoryProvider = {
  provide: <string>providerTokens.UserEntityServiceToken,
  useFactory: (
    usersRepo: MongoRepository<UserEntity>,
    eventsRepo: MongoRepository<EventEntity>,
  ) =>
    // new UserEntityService(usersRepo, eventsRepo)
    UserEntityServiceFactory.getInstance(usersRepo, eventsRepo),
  inject: [
    <string>providerTokens.UserEntityRepositoryToken,
    <string>providerTokens.EventEntityRepositoryToken,
  ],
};

export const EventEntityServiceFactoryProvider = {
  provide: <string>providerTokens.EventEntityServiceToken,
  useFactory: (
    eventsRepo: MongoRepository<EventEntity>,
    usersRepo: MongoRepository<UserEntity>,
  ) =>
    // new EventEntityService(eventsRepo, usersRepo)
    EventEntityServiceFactory.getInstance(eventsRepo, usersRepo),
  inject: [
    <string>providerTokens.EventEntityRepositoryToken,
    <string>providerTokens.UserEntityRepositoryToken,
  ],
};

export const UserEntityServiceProvider = {
  provide: UserEntityService,
  useClass: UserEntityService,
};

export const EventEntityServiceProvider = {
  provide: EventEntityService,
  useClass: EventEntityService,
};

export const testProviders = [
  UserEntityServiceFactoryProvider,
  EventEntityServiceFactoryProvider,
  // UserEntityServiceProvider,
  // EventEntityServiceProvider
];
