import { getMongoRepository, Connection } from 'typeorm';
import { UserEntity, EventEntity } from '../data/entities';
import { userBaseDto, events } from './entitiesDto.mock';
import { EventDto, UserDto } from '../src/models/dto';
import { ConnHandler } from './handlers';

export async function makeTestValues(conn: Connection) {
  if (!conn && !conn.isConnected)
    throw new Error(
      `Connection object should be conencted, got: ${JSON.stringify(conn)}`,
    );

  let userRepo = conn.getMongoRepository(UserEntity);
  let eventRepo = conn.getMongoRepository(EventEntity);

  let insUser = await userRepo.create(userBaseDto);
  await userRepo.save(insUser);
  // let user = await userRepo.find({}) [0];

  let newEvents = events.map(e =>
    Object.assign({}, e, {
      createdBy: insUser,
      participants: [insUser],
    }),
  );

  let createdEvs = await eventRepo.create(newEvents);
  await eventRepo.save(createdEvs);
  // let retEvents = await eventRepo.find({});

  let testEvents: EventDto[] = createdEvs.map(e => EventDto.fromEntity(e));

  let updUser = UserDto.fromEntity(
    Object.assign({}, insUser, {
      participating: [testEvents[0].id, testEvents[1].id],
    }),
  );

  let userUpdRes = await userRepo.findOneAndUpdate(insUser, updUser, {
    returnOriginal: false,
  });
  // let retUser = await userRepo.findOne(userUpdRes.upsertedId._id);
  let testUser = UserDto.fromEntity(userUpdRes.value);

  return [testUser, testEvents];
}

export async function removeTestValues() {
  let conn: Connection = await ConnHandler.getConn('test-conn');
  let usrRepo = conn.getMongoRepository(UserEntity);
  let evntRepo = conn.getMongoRepository(EventEntity);

  let [evnts, ce] = await evntRepo.findAndCount();
  if (ce > 0) await evntRepo.deleteMany({});

  let [usrs, cu] = await usrRepo.findAndCount();
  if (cu > 0) await usrRepo.deleteMany({});
  // await conn.close();
}
