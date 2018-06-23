import 'reflect-metadata';
import {
  createConnection,
  getMongoRepository,
  Connection,
  ConnectionOptions,
  getConnectionOptions,
  ConnectionOptionsReader,
  MongoRepository,
  AggregationCursor,
  AggregationCursorResult,
  CollectionAggregationOptions,
  getConnection,
} from 'typeorm';
import { resolve } from 'path';

import { UserEntity, EventEntity } from '../entities';
import { ConnHandler } from '../../helpers/handlers';
import { providerTokens } from '../../helpers';
import { setUpTestDb, tearDownTestDb } from '../../helpers/db.mock';

describe('Event repository', () => {
  jest.setTimeout(15000);

  let userRepo: MongoRepository<UserEntity>;
  let eventRepo: MongoRepository<EventEntity>;
  let conn: Connection;
  let connName = <string>providerTokens.testConnectionToken;
  let user1, user2, user3, user4, user5;
  let event1, event2, event3, event4, event5;

  beforeAll(async () => {
    conn = await ConnHandler.getConn(connName);
    userRepo = conn.getMongoRepository(UserEntity);
    eventRepo = conn.getMongoRepository(EventEntity);
  });

  beforeAll(async () => {
    return await tearDownTestDb(userRepo, eventRepo);
  });

  beforeEach(async () => {
    [user1, user2, user3] = await setUpTestDb(userRepo, eventRepo);
  });

  afterAll(async () => {
    return await ConnHandler.closeConn(connName);
  });

  describe('complex find', () => {
    it('should return events with certain participating users', async () => {
      let events = await eventRepo.find({
        where: {
          participants: { $in: [user1['_id'], user3['_id']] },
          location: /^rf.*/i,
          // , 'createdBy.interests': { $in: ['football'] }
        },
        skip: 1,
        take: 2,
      });

      expect(events).toBeTruthy();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].participants.length).toBeGreaterThan(0);
    });

    it('should return events where creator`s age > 33 and name like `Ma`, and location like `RF..`', async () => {
      let events = await eventRepo.find({
        where: {
          $and: [
            // { 'createdBy.age': { $gte: 33 } },
            // { 'createdBy.name': /^ma/i },
            // { 'location': { $in: [/.*rf.*/i, /.*f.*/i] } }
            // { 'participants': { $size: 2 } },
            { $where: 'this.participants.length > 2' },
            { location: /.*(rf|fi).*/i },
          ],
        },
      });
      // console.log(JSON.stringify(events, null, 2));

      expect(events).not.toBeNull();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].participants).toBeInstanceOf(Array);
      expect(events[0].participants.length).toBeGreaterThan(0);
    });
  });

  describe('aggregate finds', () => {
    it('should return projected objects of { users, amounts } grouped by created events in desc order ', async () => {
      let userPerEventsCreated = await eventRepo
        .aggregate([
          // { $match: { participants: { $in: [user1.id, user4.id] } } },
          { $group: { _id: '$createdBy', created: { $sum: 1 } } },
          { $sort: { created: -1 } },
          { $project: { _id: 0, user: '$_id', 'created : ': '$created' } },
        ])
        .toArray();
      // console.log(JSON.stringify(userPerEventsCreated, null, 2));

      expect(userPerEventsCreated).toBeTruthy();
      expect(userPerEventsCreated).toBeInstanceOf(Array);
      expect(userPerEventsCreated.length).toBeGreaterThan(0);
    });

    it('should return projected objects of {eventname, creator : User.name, participants: User.name }', async () => {
      let eventsLoolups = await eventRepo
        .aggregate([
          {
            $lookup: {
              from: userRepo.metadata.tableName,
              localField: 'createdBy',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $lookup: {
              from: userRepo.metadata.tableName,
              localField: 'participants',
              foreignField: '_id',
              as: 'parts',
            },
          },
          // , { $project: { '_id': 0, 'Event': '$name', 'Creator': '$user.name' } }
          // , { $unwind: '$user' }
          {
            $project: {
              _id: 0,
              Event: '$name',
              Creator: '$user.name',
              Participating: '$parts.name',
            },
          },
        ])
        .toArray();

      // console.log(JSON.stringify(eventsLoolups, null, 2));

      expect(eventsLoolups).toBeTruthy();
      expect(eventsLoolups).toBeInstanceOf(Array);
      expect(eventsLoolups.length).toBeGreaterThan(0);
    });
  });
});
