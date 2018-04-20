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
  MongoRepository
} from 'typeorm';
import { Inject, Module } from "@nestjs/common";
import { events, userBaseDto } from './entitiesDto.mock';
import { UserEntity, EventEntity } from '../data/entities';
import { handleError } from '../helpers/handlers';
import { UserBaseDto, UserDto, EventDto } from '../src/models/dto/';
import { EventEntityService } from '../src/modules/shared/services/events.service';
import { UserEntityService } from '../src/modules/shared/services/users.service';
import { RepositoriesProviderModule } from './repos.provider.module';


export class EventEntityServiceFactory {
  static instance: EventEntityService;

  static getInstance(eventsRepo: MongoRepository<EventEntity>, usersRepo: MongoRepository<UserEntity>) {
    if (!this.instance || this.instance == undefined) {
      this.instance = new EventEntityService(eventsRepo, usersRepo);
    }
    return this.instance;
  }
}

export class UserEntityServiceFactory {
  static instance: UserEntityService;

  static getInstance(usersRepo: MongoRepository<UserEntity>, eventsRepo: MongoRepository<EventEntity>) {
    if (!this.instance || this.instance == undefined) {
      this.instance = new UserEntityService(usersRepo, eventsRepo);
    }
    return this.instance;
  }
}

export const defaultConnectionProvider = {
  provide: 'defaultConnectionToken', useFactory: async (): Promise<Connection> => await getConn('default')
};

export const EventEntityRepositoryProvider = {
  provide: 'EventEntityRepositoryToken',
  useFactory: (conn: Connection) => conn.getMongoRepository(EventEntity)
  , inject: ['defaultConnectionToken']
};

export const UserEntityRepositoryProvider = {
  provide: 'UserEntityRepositoryToken',
  useFactory: (conn: Connection) => conn.getMongoRepository(UserEntity)
  , inject: ['defaultConnectionToken']
};

export const UserEntityServiceFactoryProvider = {
  provide: 'UserEntityServiceToken',
  useFactory: (usersRepo: MongoRepository<UserEntity>, eventsRepo: MongoRepository<EventEntity>) =>
    new UserEntityService(usersRepo, eventsRepo)
  , inject: ['UserEntityRepositoryToken', 'UserEntityRepositoryToken']
};

export const EventEntityServiceFactoryProvider = {
  provide: 'EventEntityServiceToken',
  useFactory: (eventsRepo: MongoRepository<EventEntity>, usersRepo: MongoRepository<UserEntity>) =>
    new EventEntityService(eventsRepo, usersRepo)
  , inject: ['EventEntityRepositoryToken', 'UserEntityRepositoryToken']
};

export const UserEntityServiceProvider = {
  provide: UserEntityService
  , useClass: UserEntityService
};

export const EventEntityServiceProvider = {
  provide: EventEntityService
  , useClass: EventEntityService
};

export const testProviders: any[] = [
  EventEntityServiceFactoryProvider,
  UserEntityServiceFactoryProvider
  // UserEntityServiceProvider,
  // EventEntityServiceProvider
];

export async function getConn(name = 'default') {
  if (getConnectionManager().has(name) && getConnectionManager().get(name).isConnected) {
    return Promise.resolve(getConnectionManager().get(name));
  } else {
    let ormConf = await readOrmConf();
    return await createConnection(ormConf);
  }
}

export async function closeConn(name = 'default') {
  if (getConnectionManager().has(name) && getConnection(name).isConnected)
    return await getConnection(name).close();
}

export async function makeTestValues() {
  let conn = await getConn();

  // let insUser = await conn.getMongoRepository(UserModel).save(userBaseDto);
  // let user = await conn.getMongoRepository(UserModel).findOne(insUser);

  // let newEvents = events.map(e => Object.assign({}, e, {
  //   createdBy: user,
  //   participants: [user]
  // }));

  let createdEvs = await conn.getMongoRepository(EventEntity).insertMany(events);
  // let testEvents = await conn.getMongoRepository(EventModel).find();

  // let updUser = UserDto.fromEntity(Object.assign({}, user, {
  //   participating: [testEvents[0].id.toString(), testEvents[1].id.toString()]
  // }));

  // let userUpdRes = await getMongoRepository(UserModel).updateOne({ id: user.id }, updUser, { upsert: false });
  // let testUser = UserDto.fromEntity(await getMongoRepository(UserModel).findOne(user));

  return createdEvs;
  // await conn.close();
}

export async function removeTestValues() {
  let conn: Connection = await getConn();
  let usrRepo = conn.getMongoRepository(UserEntity);
  let evntRepo = conn.getMongoRepository(EventEntity);

  let [evnts, ce] = await evntRepo.findAndCount();
  if (ce > 0)
    await evntRepo.deleteMany(evnts);

  let [usrs, cu] = await usrRepo.findAndCount();
  if (cu > 0)
    await usrRepo.deleteMany(usrs);
  // await conn.close();
}


export async function readOrmConf(path = null, name = 'default') {
  try {
    try {
      return await getConnectionOptions(name)
    }
    catch (e) {
      try {
        let rootPath = path ? path : resolve(process.cwd());
        let ormConfName = 'ormconfig.json'
        // let conf = require(resolve(rootPath, ormConfName));
        // let connStrObj = JSON.parse(conf);
        let conOptsReader = new ConnectionOptionsReader({
          root: rootPath,
          configName: ormConfName
        });

        return await conOptsReader.get(name);
      } catch (e) {
        console.warn(`No ormConfig was read, using default opts:: ${e.message || e}`);
        return Promise.resolve(opts);
      }
    }
  } catch (e) {
    handleError(e);
  }
}

const opts: ConnectionOptions = {
  type: 'mongodb',
  name: 'default',
  host: get<string>('database.host'),
  port: get<number>('database.port'),
  username: get<string>('database.creds.username'),
  password: get<string>('database.creds.password'),
  database: get<string>('database.db'),
  logging: 'all',
  logger: 'advanced-console',
  entities: [EventEntity, UserEntity],
  synchronize: true,
  entityPrefix: 'mpis'
}

